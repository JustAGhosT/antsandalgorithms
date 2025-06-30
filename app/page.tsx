import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Cpu, Zap, Users, Trophy, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐜</span>
            </div>
            <span className="font-bold text-xl">Of Ants & Algorithms</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200">
            Interactive AI Hardware Learning
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Ready to grow your ant army?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Master AI hardware concepts through interactive learning, personalized recommendations, and hands-on
            simulations. No jargon, just clear metaphors and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              >
                Start Learning Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Learn AI Hardware Like Never Before</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our unique ant colony metaphor makes complex AI concepts intuitive and engaging
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Interactive Learning</CardTitle>
              <CardDescription>Engaging modules with quizzes, simulations, and step-by-step guidance</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-amber-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle>Hardware Dashboard</CardTitle>
              <CardDescription>Personalized recommendations and performance simulators for AI hardware</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle>Real-time Simulations</CardTitle>
              <CardDescription>Test hardware upgrades and see performance impact before investing</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Personalized Paths</CardTitle>
              <CardDescription>Adaptive learning tailored to your experience level and goals</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-amber-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>XP points, achievements, and badges to keep you motivated</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle>Practical Knowledge</CardTitle>
              <CardDescription>Learn concepts you can immediately apply to real projects</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Learning Path</h2>
          <p className="text-gray-600">Tailored experiences for every skill level</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow border-2 border-green-200">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <CardTitle className="text-green-700">Curious Newbie</CardTitle>
              <CardDescription>Perfect for beginners with no AI or hardware experience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Gentle introduction with metaphors</li>
                <li>• Interactive diagrams and quizzes</li>
                <li>• Basic hardware concepts</li>
              </ul>
              <Button
                variant="outline"
                className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
              >
                Start Here
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-2 border-blue-200">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <CardTitle className="text-blue-700">Self-Taught Dev</CardTitle>
              <CardDescription>For developers building AI skills for work or projects</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Hands-on simulations</li>
                <li>• Hardware recommendations</li>
                <li>• Performance optimization</li>
              </ul>
              <Button
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                Level Up
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-2 border-purple-200">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <CardTitle className="text-purple-700">AI Professional</CardTitle>
              <CardDescription>Advanced content for rapid upskilling and optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>• Advanced benchmarking</li>
                <li>• ROI calculations</li>
                <li>• Enterprise scenarios</li>
              </ul>
              <Button
                variant="outline"
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
              >
                Optimize
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your AI Hardware Expertise?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners mastering AI hardware through our interactive platform
          </p>
          <Link href="/onboarding">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🐜</span>
                </div>
                <span className="font-bold">Of Ants & Algorithms</span>
              </div>
              <p className="text-gray-400 text-sm">
                Making AI hardware education accessible and engaging for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/modules" className="hover:text-white">
                    Learning Modules
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Hardware Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/simulator" className="hover:text-white">
                    Performance Simulator
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/leaderboard" className="hover:text-white">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/achievements" className="hover:text-white">
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link href="/forum" className="hover:text-white">
                    Discussion Forum
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Of Ants & Algorithms. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
