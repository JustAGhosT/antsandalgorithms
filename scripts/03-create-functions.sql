-- Function to increment user XP and handle level ups
CREATE OR REPLACE FUNCTION increment_user_xp(user_id UUID, xp_amount INTEGER)
RETURNS void AS $$
DECLARE
  current_xp INTEGER;
  current_level INTEGER;
  new_level INTEGER;
BEGIN
  -- Get current XP and level
  SELECT xp_points, level INTO current_xp, current_level
  FROM profiles
  WHERE id = user_id;
  
  -- Calculate new level (every 1000 XP = 1 level)
  new_level := FLOOR((current_xp + xp_amount) / 1000) + 1;
  
  -- Update profile
  UPDATE profiles
  SET 
    xp_points = xp_points + xp_amount,
    level = new_level,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION check_achievements(user_id UUID)
RETURNS void AS $$
DECLARE
  achievement_record RECORD;
  user_stats RECORD;
BEGIN
  -- Get user statistics
  SELECT 
    COUNT(DISTINCT up.module_id) as modules_completed,
    COUNT(CASE WHEN up.score = 100 THEN 1 END) as perfect_quizzes,
    p.level,
    p.xp_points
  INTO user_stats
  FROM user_progress up
  JOIN profiles p ON p.id = user_id
  WHERE up.user_id = user_id AND up.completed = true
  GROUP BY p.level, p.xp_points;
  
  -- Check each achievement
  FOR achievement_record IN 
    SELECT * FROM achievements WHERE is_active = true
  LOOP
    -- Check if user already has this achievement
    IF NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = check_achievements.user_id 
      AND achievement_id = achievement_record.id
    ) THEN
      -- Check achievement criteria
      CASE achievement_record.criteria->>'type'
        WHEN 'modules_completed' THEN
          IF user_stats.modules_completed >= (achievement_record.criteria->>'count')::INTEGER THEN
            INSERT INTO user_achievements (user_id, achievement_id) 
            VALUES (check_achievements.user_id, achievement_record.id);
          END IF;
        WHEN 'perfect_quizzes' THEN
          IF user_stats.perfect_quizzes >= (achievement_record.criteria->>'count')::INTEGER THEN
            INSERT INTO user_achievements (user_id, achievement_id) 
            VALUES (check_achievements.user_id, achievement_record.id);
          END IF;
        WHEN 'level_reached' THEN
          IF user_stats.level >= (achievement_record.criteria->>'level')::INTEGER THEN
            INSERT INTO user_achievements (user_id, achievement_id) 
            VALUES (check_achievements.user_id, achievement_record.id);
          END IF;
      END CASE;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
