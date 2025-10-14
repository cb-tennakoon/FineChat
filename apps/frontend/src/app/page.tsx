"use client"
import { useState } from 'react';
import { MessageCircle, Users, Shield, Zap } from 'lucide-react';

export default function WelcomePage() {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-time Messaging",
      description: "Instant communication with friends and colleagues"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Chats",
      description: "Create and manage conversations with multiple people"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "End-to-end encryption keeps your messages safe"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast & Reliable",
      description: "Lightning-fast message delivery you can count on"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">FineChat</span>
          </div>
          <div className="space-x-4">
            <a href="/login">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                Sign In
              </button>
            </a>
            <a href="/register">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                Sign Up
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connect, Chat, and
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Collaborate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience seamless communication with our modern chat platform. 
            Stay connected with your team, friends, and family in real-time.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/register">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started Free
              </button>
            </a>
            <button className="px-8 py-4 bg-white text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all border-2 border-gray-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => setIsHovered(idx)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className={`text-blue-600 mb-4 transition-transform ${isHovered === idx ? 'scale-110' : 'scale-100'}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to start chatting?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users already using our platform
          </p>
          <a href="/register">
            <button className="px-10 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              Create Your Account
            </button>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-20 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2025 FineChat. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}