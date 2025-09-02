'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LeadCaptureForm from '@/components/LeadCaptureForm';
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
  Clock
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
        // Track conversion event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'lead_captured', {
            event_category: 'engagement',
            event_label: 'form_submit',
            value: leadData.bonusAmount
          });
        }
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-white shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-4">
              Welcome to SmartStake! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              Your account has been created successfully! Check your email for your bonus details and exclusive offers.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-700">
                <strong>Next Steps:</strong><br />
                1. Check your email for bonus details<br />
                2. Verify your account<br />
                3. Start playing and winning!
              </p>
            </div>
            <Button 
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600"
            >
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-white text-2xl font-bold">SmartStake</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-white text-sm ml-2">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Win Big with
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              SmartStake
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of winners who've discovered the smartest way to play and win. 
            Get instant bonuses, exclusive games, and VIP treatment!
          </p>
          
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              size="xl"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Gift className="w-6 h-6 mr-3" />
              Claim Your Free Bonus Now!
            </Button>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">$2.5M+</div>
            <div className="text-blue-100">Paid Out</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">50K+</div>
            <div className="text-blue-100">Happy Players</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">24/7</div>
            <div className="text-blue-100">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">98%</div>
            <div className="text-blue-100">Win Rate</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Bonuses</h3>
              <p className="text-blue-100">Get immediate bonuses just for signing up. No waiting, no hassle!</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Secure</h3>
              <p className="text-blue-100">Bank-level security with instant withdrawals and guaranteed payouts.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">VIP Treatment</h3>
              <p className="text-blue-100">Exclusive games, personal account managers, and premium rewards.</p>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">What Our Winners Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-white mb-4">"I won $5,000 in my first week! SmartStake is incredible!"</p>
                <div className="text-blue-100 text-sm">- Sarah M., Verified Winner</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-white mb-4">"The bonuses are real and the games are amazing. Highly recommend!"</p>
                <div className="text-blue-100 text-sm">- Mike R., VIP Player</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-white mb-4">"Best platform I've ever used. Fast payouts and great support!"</p>
                <div className="text-blue-100 text-sm">- Jennifer L., Power Player</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Urgency Section */}
        <div className="text-center mb-16">
          <Card className="bg-gradient-to-r from-red-500 to-orange-500 border-0 max-w-2xl mx-auto">
            <CardContent className="p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Limited Time Offer!</h3>
              </div>
              <p className="text-xl mb-4">
                Join now and get <strong>DOUBLE BONUSES</strong> for the next 24 hours only!
              </p>
              <div className="text-3xl font-bold mb-4">
                <TrendingUp className="w-8 h-8 inline mr-2" />
                Up to $500 Welcome Bonus
              </div>
              <p className="text-sm opacity-90">
                *Offer expires in 24 hours. Terms and conditions apply.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lead Capture Form */}
        {showForm && (
          <div className="max-w-4xl mx-auto">
            <LeadCaptureForm onSubmit={handleLeadSubmit} />
          </div>
        )}

        {/* Trust Badges */}
        <div className="text-center mt-16">
          <p className="text-blue-100 mb-6">Trusted by players worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-white font-bold text-lg">SSL Secured</div>
            <div className="text-white font-bold text-lg">Licensed</div>
            <div className="text-white font-bold text-lg">Fair Play</div>
            <div className="text-white font-bold text-lg">Instant Payouts</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-white/20">
        <div className="text-center text-blue-100">
          <p className="mb-4">
            © 2024 SmartStake. All rights reserved. | 
            <a href="#" className="underline ml-2">Terms of Service</a> | 
            <a href="#" className="underline ml-2">Privacy Policy</a>
          </p>
          <p className="text-sm">
            Gambling can be addictive. Please play responsibly. 18+ only.
          </p>
        </div>
      </footer>
    </div>
  );
}
