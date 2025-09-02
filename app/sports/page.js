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
  Target,
  Award,
  TrendingDown
} from 'lucide-react';

export default function SportsPage() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLeadSubmit = async (leadData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          source: 'sports_landing',
          utmSource: 'sports',
          utmMedium: 'landing_page',
          utmCampaign: 'sports_bonus'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Welcome to SmartStake Sports! ⚽', {
          description: 'Your account has been created successfully! Check your email for your sports betting bonus details and exclusive offers.',
          duration: 5000,
        });
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
          gtag('event', 'lead_captured', {
            event_category: 'sports_landing',
            event_label: 'sports_bonus',
            value: 150
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
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">⚽</div>
            <h1 className="text-2xl font-bold text-green-600 mb-4">Welcome to SmartStake Sports!</h1>
            <p className="text-gray-600 mb-6">
              Your sports betting account has been created successfully! Check your email for your bonus details and exclusive sports offers.
            </p>
            <div className="text-left mb-6">
              <h3 className="font-semibold mb-2">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Check your email for sports betting bonus details</li>
                <li>Verify your account</li>
                <li>Start betting on your favorite sports!</li>
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            ⚽ <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Sports</span> Betting
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Get your <span className="text-green-400 font-bold">$300 Sports Bonus</span> instantly! 
            Bet on football, basketball, tennis and more with the best odds in the industry.
          </p>
          
          {!showForm && (
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg"
              onClick={() => setShowForm(true)}
            >
              Claim Your $300 Sports Bonus Now! ⚽
            </Button>
          )}
        </div>

        {/* Sports Showcase */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Football</h3>
              <p className="text-gray-300">Premier League, Champions League & more</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Basketball</h3>
              <p className="text-gray-300">NBA, EuroLeague & international leagues</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Tennis</h3>
              <p className="text-gray-300">Grand Slams, ATP & WTA tournaments</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Live Betting</h3>
              <p className="text-gray-300">In-play betting with live odds</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
            <div className="text-gray-300">Sports Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">99.2%</div>
            <div className="text-gray-300">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
            <div className="text-gray-300">Live Betting</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">1000+</div>
            <div className="text-gray-300">Daily Markets</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                Best Odds Guaranteed
              </h3>
              <p className="text-gray-300">
                We guarantee the best odds on all major sports. If you find better odds elsewhere, 
                we'll match them and give you an extra bonus.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                Live Streaming
              </h3>
              <p className="text-gray-300">
                Watch thousands of sports events live while you bet. 
                High-quality streams with no delays for the ultimate betting experience.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Urgency Section */}
        <Card className="bg-gradient-to-r from-orange-600 to-red-600 border-orange-500 mb-16">
          <CardContent className="p-8 text-center">
            <Clock className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Limited Time Sports Offer!</h2>
            <p className="text-xl text-white mb-6">
              This $300 sports bonus is only available for the next 48 hours. 
              Don't miss out on the biggest matches of the season!
            </p>
            {!showForm && (
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg"
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
                  Get Your $300 Sports Bonus! ⚽
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
