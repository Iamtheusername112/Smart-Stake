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
  TrendingUp,
  Clock,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6
} from 'lucide-react';

export default function CasinoPage() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLeadSubmit = async (leadData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          source: 'casino_landing',
          utmSource: 'casino',
          utmMedium: 'landing_page',
          utmCampaign: 'casino_bonus'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Welcome to SmartStake Casino! 🎰', {
          description: 'Your account has been created successfully! Check your email for your casino bonus details and exclusive offers.',
          duration: 5000,
        });
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
          gtag('event', 'lead_captured', {
            event_category: 'casino_landing',
            event_label: 'casino_bonus',
            value: 100
          });
        }
      } else if (response.status === 409) {
        toast.error('Email Already Registered', {
          description: 'This email is already registered. Please use a different email or try logging in.',
          duration: 4000,
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast.error('Submission Failed', {
        description: 'There was an error processing your request. Please try again.',
        duration: 4000,
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">🎰</div>
            <h1 className="text-2xl font-bold text-green-600 mb-4">Welcome to SmartStake Casino!</h1>
            <p className="text-gray-600 mb-6">
              Your casino account has been created successfully! Check your email for your bonus details and exclusive casino offers.
            </p>
            <div className="text-left mb-6">
              <h3 className="font-semibold mb-2">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Check your email for casino bonus details</li>
                <li>Verify your account</li>
                <li>Start playing casino games and winning!</li>
              </ol>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setShowForm(false);
              }}
              className="w-full"
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
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            🎰 <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">Casino</span> Bonus
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Get your <span className="text-yellow-400 font-bold">$200 Casino Bonus</span> instantly! 
            Play slots, blackjack, roulette and more with our exclusive casino offers.
          </p>
          
          {!showForm && (
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white px-8 py-4 text-lg"
              onClick={() => setShowForm(true)}
            >
              Claim Your $200 Casino Bonus Now! 🎰
            </Button>
          )}
        </div>

        {/* Casino Games Showcase */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Dice1 className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Slots</h3>
              <p className="text-gray-300">Hundreds of slot games with massive jackpots</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Dice2 className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Blackjack</h3>
              <p className="text-gray-300">Classic card games with live dealers</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Dice3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Roulette</h3>
              <p className="text-gray-300">European and American roulette tables</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">$2.5M+</div>
            <div className="text-gray-300">Total Jackpots Won</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">98.5%</div>
            <div className="text-gray-300">Payout Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-gray-300">Live Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
            <div className="text-gray-300">Casino Games</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                Secure & Licensed
              </h3>
              <p className="text-gray-300">
                Fully licensed casino with SSL encryption and fair gaming certification. 
                Your funds and personal information are completely secure.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                Instant Withdrawals
              </h3>
              <p className="text-gray-300">
                Get your winnings instantly with our lightning-fast withdrawal system. 
                No waiting, no delays - just pure gaming excitement.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Urgency Section */}
        <Card className="bg-gradient-to-r from-red-600 to-pink-600 border-red-500 mb-16">
          <CardContent className="p-8 text-center">
            <Clock className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Limited Time Offer!</h2>
            <p className="text-xl text-white mb-6">
              This $200 casino bonus is only available for the next 24 hours. 
              Don't miss out on your chance to win big!
            </p>
            {!showForm && (
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg"
                onClick={() => setShowForm(true)}
              >
                Claim Now Before It's Too Late! ⏰
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Lead Capture Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                  Get Your $200 Casino Bonus! 🎰
                </h2>
                <LeadCaptureForm onSubmit={handleLeadSubmit} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
