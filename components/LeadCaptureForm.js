'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LuckyNumberPicker from './LuckyNumberPicker';
import { Mail, Phone, User, MapPin, Gift } from 'lucide-react';

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
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-blue-800">
          Claim Your ${bonusAmount} Bonus!
        </CardTitle>
        <p className="text-gray-600">
          Just a few details to secure your lucky number bonus and start winning!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                First Name *
              </label>
              <Input
                {...register('firstName')}
                placeholder="Enter your first name"
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Last Name *
              </label>
              <Input
                {...register('lastName')}
                placeholder="Enter your last name"
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
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
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            />
            <p className="text-sm text-gray-500 mt-1">
              We'll send you exclusive bonuses via SMS!
            </p>
          </div>

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
                className={errors.age ? 'border-red-500' : ''}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Country *
              </label>
              <select
                {...register('country')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select your country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favorite Games (Optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {gameOptions.map(game => (
                <button
                  key={game}
                  type="button"
                  onClick={() => handleGameToggle(game)}
                  className={`p-2 rounded-md text-sm font-medium transition-colors ${
                    watchedGames.includes(game)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800">Your Lucky Number Bonus</p>
                <p className="text-sm text-green-600">Number: {luckyNumber} | Bonus: ${bonusAmount}</p>
              </div>
              <div className="text-2xl font-bold text-green-600">
                ${bonusAmount}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Claiming Your Bonus...' : `Claim My $${bonusAmount} Bonus Now!`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our Terms of Service and Privacy Policy. 
            You must be 18+ to participate. Gambling can be addictive, please play responsibly.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
