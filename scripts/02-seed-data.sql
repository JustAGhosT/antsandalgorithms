-- Insert learning modules
INSERT INTO learning_modules (title, description, persona_target, difficulty_level, xp_reward, estimated_duration) VALUES
('AI Fundamentals', 'Introduction to artificial intelligence concepts using simple metaphors', 'newbie', 1, 100, 30),
('Hardware Basics', 'Understanding computer hardware components for AI', 'newbie', 1, 100, 25),
('GPU Architecture', 'Deep dive into GPU cores and parallel processing', 'all', 2, 150, 45),
('Memory Systems', 'How AI models use and manage memory efficiently', 'developer', 2, 150, 40),
('Performance Optimization', 'Advanced techniques for maximizing AI hardware performance', 'professional', 3, 200, 60);

-- Insert learning sections for GPU Architecture module (ID will be 3)
INSERT INTO learning_sections (module_id, title, content_type, content, order_index, xp_reward) VALUES
(3, 'Meet Your GPU: The Ant Colony', 'content', '{
  "text": "Imagine your GPU as a massive ant colony with thousands of worker ants. Each ant (GPU core) is simple but when they work together, they can accomplish incredible tasks!",
  "visual": "🐜🐜🐜🐜🐜\\n🐜🐜🐜🐜🐜\\n🐜🐜🐜🐜🐜",
  "keyPoints": [
    "GPUs have thousands of simple cores (like worker ants)",
    "Each core handles one small task at a time", 
    "Together, they process massive amounts of data in parallel"
  ]
}', 1, 25),

(3, 'How Ant Colonies Organize Work', 'interactive', '{
  "text": "In nature, ant colonies divide work efficiently. Some ants gather food, others build, and some defend. GPUs work similarly - different cores handle different parts of your AI model.",
  "simulation": true,
  "keyPoints": [
    "Parallel processing = many ants working simultaneously",
    "Task distribution keeps all cores busy",
    "Coordination prevents conflicts and maximizes efficiency"
  ]
}', 2, 25),

(3, 'Quiz: Understanding GPU Cores', 'quiz', '{
  "question": "Why are GPUs better than CPUs for AI training?",
  "options": [
    "GPUs have faster individual cores",
    "GPUs have many more cores working in parallel", 
    "GPUs use less power",
    "GPUs are cheaper"
  ],
  "correct": 1,
  "explanation": "Correct! GPUs excel at AI training because they have thousands of cores that can process data in parallel, just like an ant colony with many workers accomplishing tasks simultaneously."
}', 3, 50),

(3, 'Memory: The Colony''s Food Storage', 'content', '{
  "text": "Just like ants need to store and access food efficiently, GPUs need fast memory to feed data to all those cores. This is where GPU memory (VRAM) becomes crucial.",
  "visual": "🏪 Memory Storage\\n⬇️ ⬇️ ⬇️\\n🐜 🐜 🐜 Working Cores",
  "keyPoints": [
    "VRAM stores model weights and training data",
    "More VRAM = larger models you can train",
    "Memory bandwidth = how fast ants can access food"
  ]
}', 4, 25);

-- Insert achievements
INSERT INTO achievements (name, description, icon, criteria, xp_reward) VALUES
('First Steps', 'Complete your first module', '👶', '{"type": "modules_completed", "count": 1}', 50),
('Quiz Master', 'Score 100% on 5 quizzes', '🧠', '{"type": "perfect_quizzes", "count": 5}', 100),
('Hardware Expert', 'Complete GPU Architecture module', '🏆', '{"type": "specific_module", "module_id": 3}', 150),
('Speed Learner', 'Complete 3 modules in one week', '⚡', '{"type": "modules_in_timeframe", "count": 3, "days": 7}', 200),
('Perfectionist', 'Score 100% on 10 quizzes', '💯', '{"type": "perfect_quizzes", "count": 10}', 250),
('Colony Master', 'Reach Level 5', '👑', '{"type": "level_reached", "level": 5}', 500);

-- Insert hardware recommendations
INSERT INTO hardware_recommendations (name, type, price_usd, rating, specifications, target_personas, use_cases, pros, cons) VALUES
('NVIDIA RTX 4070', 'GPU', 599, 4.8, '{
  "memory": "12GB GDDR6X",
  "cores": 5888,
  "base_clock": "1920 MHz",
  "boost_clock": "2475 MHz",
  "memory_bandwidth": "504.2 GB/s",
  "power_consumption": "200W"
}', ARRAY['newbie', 'developer'], 
ARRAY['AI Learning', 'Small to Medium Models', 'Gaming'], 
ARRAY['Great price/performance', 'Sufficient VRAM', 'Power efficient'],
ARRAY['Not ideal for large models', 'Limited for professional use']),

('AMD Ryzen 7 7700X', 'CPU', 329, 4.6, '{
  "cores": 8,
  "threads": 16,
  "base_clock": "4.5 GHz",
  "boost_clock": "5.4 GHz",
  "cache": "32MB L3",
  "tdp": "105W"
}', ARRAY['newbie', 'developer', 'professional'],
ARRAY['AI Training', 'Data Processing', 'General Computing'],
ARRAY['Excellent single-thread performance', 'Good value', 'Low power consumption'],
ARRAY['Fewer cores than some alternatives', 'Requires DDR5 for best performance']),

('32GB DDR5-5600', 'RAM', 189, 4.7, '{
  "capacity": "32GB",
  "speed": "5600 MT/s",
  "latency": "CL36",
  "voltage": "1.25V",
  "kit": "2x16GB"
}', ARRAY['developer', 'professional'],
ARRAY['AI Training', 'Large Dataset Processing', 'Multitasking'],
ARRAY['High capacity', 'Fast speeds', 'Future-proof'],
ARRAY['Higher cost than DDR4', 'May need BIOS updates']);
