'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Dice1, 
  Activity, 
  Menu, 
  X,
  Trophy,
  Star
} from 'lucide-react';

export default function Navigation({ currentPage = 'home' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { 
      href: '/', 
      label: 'Home', 
      icon: Home, 
      description: 'Main Platform',
      active: currentPage === 'home'
    },
    { 
      href: '/casino', 
      label: 'Casino', 
      icon: Dice1, 
      description: 'Casino Games',
      active: currentPage === 'casino'
    },
    { 
      href: '/sports', 
      label: 'Sports', 
      icon: Activity, 
      description: 'Sports Betting',
      active: currentPage === 'sports'
    }
  ];

  return (
    <header className="relative z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="text-black font-bold text-xl">S</span>
            </div>
            <div>
              <span className="text-white text-2xl font-bold">SmartStake</span>
              <div className="text-white/60 text-xs">Premium Gaming</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    item.active
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-white text-sm ml-2">4.9/5 Rating</span>
            </div>
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      item.active
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-white/60">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-white text-sm ml-2">4.9/5 Rating</span>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
