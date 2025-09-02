'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LuckyNumberPicker from './LuckyNumberPicker';
import { toast } from 'sonner';
import { 
  Mail, 
  Phone, 
  User, 
  MapPin, 
  Gift, 
  Trophy,
  Star,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const leadSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
  age: z.number().min(18, 'You must be 18 or older').max(100, 'Please enter a valid age'),
  country: z.string().min(2, 'Please select your country'),
  preferredGames: z.array(z.string()).optional(),
});

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 
  'Denmark', 'Finland', 'Ireland', 'New Zealand', 'Other'
];

const gameOptions = [
  'Slots', 'Blackjack', 'Roulette', 'Poker', 'Sports Betting', 
  'Live Casino', 'Baccarat', 'Craps', 'Bingo', 'Lottery'
];

export default function LeadCaptureForm({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [luckyNumber, setLuckyNumber] = useState(null);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(leadSchema)
  });

  const watchedGames = watch('preferredGames') || [];

  const handleGameToggle = (game) => {
    const currentGames = watchedGames;
    if (currentGames.includes(game)) {
      setValue('preferredGames', currentGames.filter(g => g !== game));
    } else {
      setValue('preferredGames', [...currentGames, game]);
    }
  };

  const handleNumberPicked = (number, bonus) => {
    setLuckyNumber(number);
    setBonusAmount(bonus);
    setStep(2);
    toast.success('Lucky Number Selected! 🎯', {
      description: `You picked ${number} and won $${bonus} bonus!`,
      duration: 3000,
    });
  };

  const onFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const leadData = {
        ...data,
        luckyNumber,
        bonusAmount,
        leadScore: calculateLeadScore(data),
        source: 'organic',
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || 'direct',
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || 'organic',
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || 'default'
      };
      
      await onSubmit(leadData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateLeadScore = (data) => {
    let score = 0;
    
    // Email domain scoring
    const domain = data.email.split('@')[1];
    const premiumDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    if (premiumDomains.includes(domain)) score += 10;
    
    // Phone number presence
    if (data.phone) score += 15;
    
    // Age scoring (18-35 is highest value for gambling)
    if (data.age >= 18 && data.age <= 35) score += 20;
    else if (data.age >= 36 && data.age <= 50) score += 15;
    else if (data.age >= 51) score += 10;
    
    // Country scoring
    const highValueCountries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'];
    if (highValueCountries.includes(data.country)) score += 15;
    
    // Game preferences
    if (data.preferredGames && data.preferredGames.length > 0) score += 10;
    
    return Math.min(score, 100);
  };

  if (step === 1) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <LuckyNumberPicker onNumberPicked={handleNumberPicked} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-white shadow-2xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">VIP Registration</h2>
              <p className="text-white/80">Join SmartStake Elite</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">${bonusAmount} Bonus</div>
            <p className="text-white/80">Your lucky number: <span className="font-bold">{luckyNumber}</span></p>
          </div>
        </div>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input
                    {...register('firstName')}
                    placeholder="Enter your first name"
                    className={`h-12 ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'focus:border-purple-500'}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Input
                    {...register('lastName')}
                    placeholder="Enter your last name"
                    className={`h-12 ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'focus:border-purple-500'}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email address"
                  className={`h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-purple-500'}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number (Optional)
                </label>
                <Input
                  type="tel"
                  {...register('phone')}
                  placeholder="Enter your phone number"
                  className="h-12 focus:border-purple-500"
                />
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Get exclusive SMS bonuses and VIP updates!
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                Additional Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <Input
                    type="number"
                    {...register('age', { valueAsNumber: true })}
                    placeholder="Enter your age"
                    min="18"
                    max="100"
                    className={`h-12 ${errors.age ? 'border-red-500 focus:border-red-500' : 'focus:border-purple-500'}`}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.age.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Country *
                  </label>
                  <select
                    {...register('country')}
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Game Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Star className="w-5 h-5 mr-2 text-purple-600" />
                Favorite Games (Optional)
              </h3>
              <p className="text-sm text-gray-600">Select your favorite games to get personalized recommendations</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gameOptions.map(game => (
                  <button
                    key={game}
                    type="button"
                    onClick={() => handleGameToggle(game)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      watchedGames.includes(game)
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {game}
                  </button>
                ))}
              </div>
            </div>

            {/* Bonus Summary */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-green-800 text-lg">Your VIP Bonus Package</h4>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-green-700">Lucky Number: <span className="font-bold">{luckyNumber}</span></span>
                  </div>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-green-700">Welcome Bonus: <span className="font-bold">${bonusAmount}</span></span>
                  </div>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-green-700">VIP Status: <span className="font-bold">Instant Access</span></span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">${bonusAmount}</div>
                  <p className="text-sm text-green-600">Total Bonus</p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Claiming Your VIP Bonus...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Trophy className="w-6 h-6 mr-2" />
                  Claim My ${bonusAmount} VIP Bonus
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </Button>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                <strong>Terms & Conditions:</strong> By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                You must be 18+ to participate. Gambling can be addictive, please play responsibly. 
                Bonus terms apply. Licensed and regulated.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}