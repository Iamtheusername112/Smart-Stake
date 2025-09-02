'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { toast } from 'sonner';
import { 
  Star, 
  Shield, 
  Zap, 
  Trophy, 
  Users, 
  DollarSign,
  CheckCircle,
  Gift,
  TrendingUp,
  Clock,
  Play,
  Award,
  ArrowRight,
  Sparkles,
  Target,
  Lock
} from 'lucide-react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLeadSubmit = async (leadData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Welcome to SmartStake! 🎉', {
          description: `Your ${leadData.bonusAmount} bonus is ready! Check your email for details.`,
          duration: 5000,
        });
        // Track conversion event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'lead_captured', {
            event_category: 'engagement',
            event_label: 'form_submit',
            value: leadData.bonusAmount
          });
        }
      } else if (response.status === 409) {
        // Handle duplicate email
        toast.error('Email Already Registered', {
          description: 'This email is already registered. Please use a different email address.',
          duration: 4000,
        });
      } else {
        const errorData = await response.json();
        toast.error('Submission Failed', {
          description: errorData.error || 'Something went wrong. Please try again.',
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast.error('Network Error', {
        description: 'Please check your connection and try again.',
        duration: 4000,
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to SmartStake! 🎉</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Your VIP account has been created successfully! Check your email for your exclusive bonus details.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Your Next Steps:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Check your email for bonus details</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Verify your account</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Start playing and winning!</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 text-lg"
            >
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-xl">S</span>
              </div>
              <span className="text-white text-2xl font-bold">SmartStake</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors font-medium">How It Works</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors font-medium">Reviews</a>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-2"
              >
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-white text-sm font-medium">#1 Gambling Platform 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Win Big with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                Smart Gambling
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join 50,000+ winners who use our proven strategies to maximize their gambling profits. 
              Get instant bonuses, exclusive games, and VIP treatment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-10 py-4 text-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Claim $200 Bonus
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-4 text-xl backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>Licensed & Regulated</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>50K+ Players</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/60">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$10M+</div>
              <div className="text-white/60">Winnings Paid</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/60">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60">VIP Support</div>
            </div>
          </div>

          {/* Features */}
          <div id="features" className="mb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Why Choose SmartStake?</h2>
            <p className="text-white/60 text-center mb-16 text-lg">The most advanced gambling platform with proven results</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Instant Bonuses</h3>
                  <p className="text-white/70 text-lg leading-relaxed">Get up to $200 in welcome bonuses plus daily rewards and exclusive promotions</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Proven Strategies</h3>
                  <p className="text-white/70 text-lg leading-relaxed">Learn winning techniques from gambling experts with 98% success rate</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
                  <p className="text-white/70 text-lg leading-relaxed">Instant deposits, withdrawals, and access to exclusive games</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How It Works */}
          <div id="how-it-works" className="mb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-4">How It Works</h2>
            <p className="text-white/60 text-center mb-16 text-lg">Get started in 3 simple steps</p>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <span className="text-black font-bold text-2xl">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Sign Up Free</h3>
                <p className="text-white/70 text-lg leading-relaxed">Create your VIP account in seconds and get instant access to exclusive bonuses</p>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transform translate-x-6"></div>
              </div>
              
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <span className="text-black font-bold text-2xl">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Get Your Bonus</h3>
                <p className="text-white/70 text-lg leading-relaxed">Receive up to $200 in welcome bonuses immediately in your account</p>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transform translate-x-6"></div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <span className="text-black font-bold text-2xl">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Start Winning</h3>
                <p className="text-white/70 text-lg leading-relaxed">Use our proven strategies and start maximizing your profits today</p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div id="testimonials" className="mb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-4">What Our VIP Players Say</h2>
            <p className="text-white/60 text-center mb-16 text-lg">Join thousands of satisfied winners</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-black font-bold text-lg">J</span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">John M.</div>
                      <div className="text-white/60">VIP Player</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">"SmartStake completely transformed my gambling experience. I've made over $15,000 in my first 3 months!"</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-black font-bold text-lg">S</span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">Sarah L.</div>
                      <div className="text-white/60">VIP Player</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">"The bonuses are incredible and the strategies actually work. The VIP support is outstanding!"</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-black font-bold text-lg">M</span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">Mike R.</div>
                      <div className="text-white/60">VIP Player</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">"Best gambling platform I've ever used. The exclusive games and bonuses are unmatched!"</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Urgency Section */}
          <div className="text-center mb-20">
            <Card className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 border-0 max-w-4xl mx-auto shadow-2xl">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-white mr-3" />
                  <span className="text-white text-xl font-bold">LIMITED TIME OFFER</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">Don't Miss Out!</h2>
                <p className="text-white text-xl mb-8 leading-relaxed">
                  Join now and get a $200 welcome bonus + exclusive access to our premium strategies. 
                  This VIP offer expires in 24 hours!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setShowForm(true)}
                    size="lg"
                    className="bg-white text-red-500 hover:bg-gray-100 font-bold px-10 py-4 text-xl shadow-2xl"
                  >
                    <Trophy className="w-6 h-6 mr-2" />
                    Claim Your $200 Bonus
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-red-500 px-10 py-4 text-xl"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-xl">S</span>
              </div>
              <span className="text-white text-2xl font-bold">SmartStake</span>
            </div>
            <div className="flex space-x-8 text-white/60">
              <a href="#" className="hover:text-white transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Contact</a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40">
            <p>&copy; 2025 SmartStake. All rights reserved. | Licensed & Regulated</p>
          </div>
        </div>
      </footer>

      {/* Lead Capture Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Join SmartStake VIP</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <LeadCaptureForm onSubmit={handleLeadSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}