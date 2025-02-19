import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Brain, Globe, MessageSquare, Code, 
  Zap, Star, Trophy, Users, BookOpen, BarChart 
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const orbitItems = [
    { icon: <Code className="w-5 h-5 text-[#61DAFB]" />, delay: 0 },    // React Blue
    { icon: <Code className="w-5 h-5 text-[#42B883]" />, delay: -2 },   // Vue Green
    { icon: <Code className="w-5 h-5 text-[#FF3E00]" />, delay: -4 },   // Svelte Orange
    { icon: <Code className="w-5 h-5 text-white" />, delay: -6 }        // White
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "English Learner",
      text: "SpeakAI has transformed how I learn English. The natural conversations with AI make practice fun and effective.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Carlos Rodriguez",
      role: "Language Student",
      text: "The immediate feedback and personalized lessons have helped me improve my speaking skills dramatically.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
  ];

  const stats = [
    { label: 'Active Learners', value: '50K+', icon: <Users className="w-6 h-6" /> },
    { label: 'Languages Supported', value: '10+', icon: <Globe className="w-6 h-6" /> },
    { label: 'Learning Hours', value: '1M+', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'Success Rate', value: '95%', icon: <BarChart className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen hero-gradient text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8" />
            <span className="text-2xl font-bold">SpeakAI</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['Products', 'Solutions', 'Resources', 'Enterprise', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <button
            onClick={() => navigate('/assistant')}
            className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center pt-20 pb-32">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">AI-Powered English Learning</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            AI-Powered Language Learning Infrastructure
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            SpeakAI provides you the tools and infrastructure to learn languages through natural conversations with AI.
          </p>
          <button
            onClick={() => navigate('/assistant')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center space-x-2 mx-auto"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="glass-card rounded-xl p-8">
            <div className="mb-8">
              <div className="chat-bubble rounded-lg p-4 mb-4 w-fit">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>0.87s</span>
                </div>
                <p className="mt-2">Hello! How can I help you learn English today?</p>
              </div>
              <div className="chat-bubble rounded-lg p-4 ml-auto w-fit bg-blue-500/10">
                <p>I'd like to practice conversation</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Natural Conversations</h2>
            <p className="text-gray-400">
              Practice speaking naturally with our AI that adapts to your learning style and pace.
            </p>
          </div>

          <div className="glass-card rounded-xl p-8">
            <div className="orbit-container mb-8">
              <div className="orbit-line"></div>
              {orbitItems.map((item, index) => (
                <div
                  key={index}
                  className="orbit-item"
                  style={{
                    animation: `orbit ${8 + index}s linear infinite`,
                    animationDelay: `${item.delay}s`
                  }}
                >
                  {item.icon}
                </div>
              ))}
              <div className="brain-icon">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Multiple Learning Paths</h2>
            <p className="text-gray-400">
              Choose from various learning methods and customize your experience.
            </p>
          </div>

          <div className="glass-card rounded-xl p-8">
            <div className="relative h-48 mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-gray-700 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-gray-600 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Globe className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Global Learning</h2>
            <p className="text-gray-400">
              Connect with AI tutors anytime, anywhere, and practice at your own pace.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Learners Worldwide</h2>
            <p className="text-gray-400">Join thousands of students improving their language skills with AI</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400">Real experiences from real learners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card rounded-xl p-8">
                <div className="flex items-start space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">{testimonial.text}</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center pb-32">
          <div className="glass-card rounded-2xl p-12 glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already improving their language skills with AI-powered conversations.
            </p>
            <button
              onClick={() => navigate('/assistant')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center space-x-2 mx-auto"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;