'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  CheckCircle,
  Trophy,
  Gift,
  Mail,
  Phone,
  CreditCard,
  Shield,
  Star,
  ArrowRight,
  Clock,
  Target,
  Zap,
  Crown,
  DollarSign,
  Users,
  TrendingUp,
  Award,
  Activity,
  Dice1,
  ExternalLink
} from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function AccountPage() {
  const [userData, setUserData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate getting user data from localStorage or API
    const storedUserData = localStorage.getItem('smartstake_user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setIsLoading(false);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Account Created",
      description: "Your SmartStake account is ready!",
      icon: CheckCircle,
      completed: true
    },
    {
      id: 2,
      title: "Verify Email",
      description: "Check your email and click the verification link",
      icon: Mail,
      completed: false
    },
    {
      id: 3,
      title: "Make First Deposit",
      description: "Deposit $20+ to claim your bonus",
      icon: CreditCard,
      completed: false
    },
    {
      id: 4,
      title: "Start Playing",
      description: "Your bonus is active - start winning!",
      icon: Trophy,
      completed: false
    }
  ];

  const handleVerifyEmail = () => {
    toast.success('Verification Email Sent! 📧', {
      description: 'Check your inbox and click the verification link.',
      duration: 5000,
    });
    setCurrentStep(2);
  };

  const handleMakeDeposit = () => {
    toast.success('Redirecting to Deposit... 💳', {
      description: 'You will be redirected to our secure payment processor.',
      duration: 3000,
    });
    setCurrentStep(3);
  };

  const handleStartPlaying = () => {
    toast.success('Welcome to SmartStake! 🎉', {
      description: 'Your account is fully activated. Start playing now!',
      duration: 5000,
    });
    setCurrentStep(4);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation currentPage="account" />
        <div className="container mx-auto px-4 py-20 text-center">
          <Card className="max-w-md mx-auto bg-white shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Not Found</h2>
              <p className="text-gray-600 mb-6">Please register first to access your account.</p>
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Go to Registration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation currentPage="account" />
      
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to SmartStake, {userData.firstName}! 🎉
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your account has been created successfully. Follow these steps to claim your bonus and start playing!
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.completed;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-sm font-medium mb-1 ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/50 text-center">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-0.5 mt-6 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-600'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Based on Current Step */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <Card className="bg-white shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center">
                <CardTitle className="text-2xl">Account Created Successfully! ✅</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${userData.bonusAmount} Bonus
                  </div>
                  <p className="text-gray-600">Your lucky number: <span className="font-bold text-purple-600">{userData.luckyNumber}</span></p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="font-bold text-green-800 mb-3 flex items-center">
                      <Gift className="w-5 h-5 mr-2" />
                      Your Bonus Package
                    </h3>
                    <ul className="space-y-2 text-green-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        ${userData.bonusAmount} Welcome Bonus
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        VIP Account Status
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Access to All Games
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        24/7 Customer Support
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Account Security
                    </h3>
                    <ul className="space-y-2 text-blue-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Bank-Level Encryption
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Licensed & Regulated
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Instant Withdrawals
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Fair Play Guaranteed
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={handleVerifyEmail}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Verify Email & Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="bg-white shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center">
                <CardTitle className="text-2xl">Verify Your Email 📧</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Check Your Email</h3>
                  <p className="text-gray-600">
                    We've sent a verification link to <span className="font-bold">{userData.email}</span>
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 mb-8">
                  <h4 className="font-bold text-yellow-800 mb-2">What to do next:</h4>
                  <ol className="text-yellow-700 space-y-1">
                    <li>1. Check your email inbox (and spam folder)</li>
                    <li>2. Click the verification link in the email</li>
                    <li>3. Return here to continue with your deposit</li>
                  </ol>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Button 
                    onClick={handleVerifyEmail}
                    variant="outline"
                    className="h-12"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Resend Verification Email
                  </Button>
                  <Button 
                    onClick={handleMakeDeposit}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold h-12"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    I've Verified - Make Deposit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="bg-white shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center">
                <CardTitle className="text-2xl">Make Your First Deposit 💳</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Claim Your ${userData.bonusAmount} Bonus</h3>
                  <p className="text-gray-600">
                    Make a minimum deposit of $20 to activate your bonus
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-gray-900 mb-2">$20</div>
                    <div className="text-sm text-gray-600">Minimum Deposit</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">${userData.bonusAmount}</div>
                    <div className="text-sm text-gray-600">Your Bonus</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">${20 + userData.bonusAmount}</div>
                    <div className="text-sm text-gray-600">Total Balance</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-8">
                  <h4 className="font-bold text-blue-800 mb-3">Accepted Payment Methods:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-sm font-bold">💳 Credit Card</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-sm font-bold">🏦 Bank Transfer</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-sm font-bold">📱 E-Wallet</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-sm font-bold">₿ Crypto</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={handleMakeDeposit}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 text-lg"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Make Deposit Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">
                    Secure 256-bit SSL encryption • Instant processing • Licensed & regulated
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <div className="space-y-8">
              <Card className="bg-white shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center">
                  <CardTitle className="text-2xl">🎉 You're All Set! Start Playing Now</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SmartStake VIP!</h3>
                    <p className="text-gray-600">
                      Your ${userData.bonusAmount} bonus is now active. Start playing and winning!
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                      <CardContent className="p-6 text-center">
                        <Dice1 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h4 className="font-bold text-gray-900 mb-2">Casino Games</h4>
                        <p className="text-gray-600 text-sm mb-4">500+ premium casino games</p>
                        <Button 
                          onClick={() => window.location.href = '/casino'}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Play Casino
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <CardContent className="p-6 text-center">
                        <Activity className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h4 className="font-bold text-gray-900 mb-2">Sports Betting</h4>
                        <p className="text-gray-600 text-sm mb-4">50+ sports markets</p>
                        <Button 
                          onClick={() => window.location.href = '/sports'}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          Bet Sports
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                      <CardContent className="p-6 text-center">
                        <Crown className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                        <h4 className="font-bold text-gray-900 mb-2">VIP Support</h4>
                        <p className="text-gray-600 text-sm mb-4">24/7 personal support</p>
                        <Button 
                          variant="outline"
                          className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                        >
                          Contact Support
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-3">🎁 Bonus Terms & Conditions:</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Your ${userData.bonusAmount} bonus is now active in your account</li>
                      <li>• Wagering requirement: 35x for casino games, 5x for sports betting</li>
                      <li>• Bonus valid for 30 days from activation</li>
                      <li>• Maximum bet with bonus: $5 per spin/hand</li>
                      <li>• Terms and conditions apply</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center text-white">
                    <DollarSign className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">${userData.bonusAmount}</div>
                    <div className="text-sm text-white/60">Bonus Balance</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center text-white">
                    <Trophy className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">VIP</div>
                    <div className="text-sm text-white/60">Account Status</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center text-white">
                    <Star className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">4.9/5</div>
                    <div className="text-sm text-white/60">Rating</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center text-white">
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm text-white/60">Players</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
