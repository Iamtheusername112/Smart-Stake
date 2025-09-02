'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import SportsLuckyPicker from '@/components/SportsLuckyPicker';
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
  Crown,
  Activity,
  Target as TargetIcon,
  BarChart3,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function SportsPage() {
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
        toast.success('Welcome to SmartStake Sports! ⚽', {
          description: `Your ${leadData.bonusAmount} sports bonus is ready! Check your email for details.`,
          duration: 5000,
        });
        // Track conversion event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'lead_captured', {
            event_category: 'engagement',
            event_label: 'sports_page',
            value: leadData.bonusAmount
          });
        }

        // Trigger sports welcome email sequence
        try {
          await fetch('/api/email/welcome-sequence', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: leadData.email,
              firstName: leadData.firstName,
              bonusAmount: leadData.bonusAmount,
              luckyNumber: leadData.luckyNumber,
              userType: 'sports'
            }),
          });
        } catch (error) {
          console.error('Failed to trigger sports welcome sequence:', error);
        }
      } else if (response.status === 409) {
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to SmartStake Sports! ⚽</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Your VIP sports betting account has been created successfully! Check your email for your exclusive bonus details.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Your Sports Bonus:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Check your email for bonus details</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Access to 50+ sports markets</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Start betting and winning!</span>
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
      <Navigation currentPage="sports" />

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
              <span className="text-white text-sm font-medium">#1 Sports Betting 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Ultimate Sports
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                Betting Experience
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Bet on 50+ sports with the best odds and highest limits. Get instant bonuses, 
              live betting, and VIP treatment at SmartStake Sports.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-10 py-4 text-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
              >
                <Activity className="w-5 h-5 mr-2" />
                Claim $250 Sports Bonus
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-4 text-xl backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2" />
                View Odds
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>Licensed Sportsbook</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>Best Odds Guaranteed</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>50K+ Bettors</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/60">Sports Markets</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99%</div>
              <div className="text-white/60">Payout Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60">Live Betting</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$2M+</div>
              <div className="text-white/60">Won Daily</div>
            </div>
          </div>

          {/* Sports Categories */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Premium Sports Betting</h2>
            <p className="text-white/60 text-center mb-16 text-lg">The best sports with the highest odds</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Football</h3>
                  <p className="text-white/70 text-lg leading-relaxed">NFL, College Football, Premier League, Champions League with live betting</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TargetIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Basketball</h3>
                  <p className="text-white/70 text-lg leading-relaxed">NBA, College Basketball, EuroLeague with in-play betting and props</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Tennis</h3>
                  <p className="text-white/70 text-lg leading-relaxed">ATP, WTA, Grand Slams with live scores and match betting</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sports Features */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Why Choose SmartStake Sports?</h2>
            <p className="text-white/60 text-center mb-16 text-lg">The ultimate sports betting experience with unmatched benefits</p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Best Odds Guaranteed</h3>
                    <p className="text-white/70">We guarantee the best odds on all major sports with price boosts daily</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Live Betting</h3>
                    <p className="text-white/70">Bet in real-time with live odds updates and instant cashouts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">VIP Betting</h3>
                    <p className="text-white/70">Higher limits, personal account managers, and exclusive promotions</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Secure & Licensed</h3>
                    <p className="text-white/70">Fully licensed sportsbook with bank-level security and instant payouts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Expert Analysis</h3>
                    <p className="text-white/70">Get expert tips, analysis, and insights from professional handicappers</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Daily Promotions</h3>
                    <p className="text-white/70">Get daily bonuses, free bets, and special event promotions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-4">What Our Sports Bettors Say</h2>
            <p className="text-white/60 text-center mb-16 text-lg">Join thousands of successful sports bettors</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-black font-bold text-lg">J</span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">John M.</div>
                      <div className="text-white/60">Sports VIP</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">"I've made over $50,000 betting on NFL games here! The odds are incredible and payouts are instant."</p>
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
                      <div className="text-white/60">Live Betting Expert</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">"The live betting feature is amazing! I love being able to cash out early when I'm ahead."</p>
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
                      <div className="text-white/60">Basketball Pro</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">"Best NBA betting site online! The prop bets and live odds are unmatched anywhere else."</p>
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
                  <span className="text-white text-xl font-bold">LIMITED TIME SPORTS OFFER</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">Don't Miss Out!</h2>
                <p className="text-white text-xl mb-8 leading-relaxed">
                  Join now and get a $250 sports bonus + 50% profit boost + VIP status. 
                  This exclusive offer expires in 24 hours!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setShowForm(true)}
                    size="lg"
                    className="bg-white text-red-500 hover:bg-gray-100 font-bold px-10 py-4 text-xl shadow-2xl"
                  >
                    <Activity className="w-6 h-6 mr-2" />
                    Claim $250 Sports Bonus
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
              <span className="text-white text-2xl font-bold">SmartStake Sports</span>
            </div>
            <div className="flex space-x-8 text-white/60">
              <a href="#" className="hover:text-white transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Contact</a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40">
            <p>&copy; 2025 SmartStake Sports. All rights reserved. | Licensed & Regulated</p>
          </div>
        </div>
      </footer>

      {/* Lead Capture Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Join SmartStake Sports</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <LeadCaptureForm onSubmit={handleLeadSubmit} LuckyPickerComponent={SportsLuckyPicker} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}