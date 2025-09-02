'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Sparkles, 
  Gift, 
  Trophy, 
  Star,
  Zap,
  Crown,
  Target,
  CheckCircle,
  ArrowRight,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Coins,
  Gem
} from 'lucide-react';

export default function CasinoLuckyPicker({ onNumberPicked, isComplete }) {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(0);

  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);

  const handleNumberSelect = (number) => {
    if (isSpinning || isComplete) return;
    
    setSelectedNumber(number);
    setIsSpinning(true);
    
    // Simulate spinning animation
    setTimeout(() => {
      setIsSpinning(false);
      setShowResult(true);
      
      // Calculate casino bonus based on number (higher numbers = higher bonuses)
      const baseBonus = Math.floor(number * 3) + Math.floor(Math.random() * 75);
      const casinoMultiplier = number >= 40 ? 1.5 : number >= 25 ? 1.3 : number >= 15 ? 1.1 : 1;
      const bonus = Math.floor(baseBonus * casinoMultiplier);
      setBonusAmount(bonus);
      
      onNumberPicked(number, bonus);
    }, 2000);
  };

  const getCasinoBonusMessage = (number) => {
    if (number >= 40) return "🎰 MEGA CASINO BONUS! You're a high roller!";
    if (number >= 25) return "🎲 PREMIUM BONUS! Big casino wins incoming!";
    if (number >= 15) return "💎 GOLD BONUS! You've got casino luck!";
    return "🎯 SILVER BONUS! Every spin brings rewards!";
  };

  const getCasinoTier = (number) => {
    if (number >= 40) return { 
      tier: "MEGA CASINO", 
      color: "from-red-500 to-pink-500", 
      icon: Crown,
      description: "High Roller Status"
    };
    if (number >= 25) return { 
      tier: "PREMIUM CASINO", 
      color: "from-purple-500 to-blue-500", 
      icon: Gem,
      description: "VIP Player"
    };
    if (number >= 15) return { 
      tier: "GOLD CASINO", 
      color: "from-yellow-500 to-orange-500", 
      icon: Trophy,
      description: "Gold Member"
    };
    return { 
      tier: "SILVER CASINO", 
      color: "from-gray-400 to-gray-600", 
      icon: Coins,
      description: "Silver Member"
    };
  };

  if (showResult) {
    const casinoTier = getCasinoTier(selectedNumber);
    const TierIcon = casinoTier.icon;
    
    return (
      <Card className="w-full max-w-lg mx-auto bg-white shadow-2xl border-0 overflow-hidden">
        <div className={`bg-gradient-to-r ${casinoTier.color} p-8 text-white text-center`}>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <TierIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Casino Bonus Won! 🎰</h2>
          <p className="text-white/90 text-lg">You've unlocked the {casinoTier.tier} tier!</p>
        </div>

        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="text-5xl font-bold text-gray-900">
              ${bonusAmount}
            </div>
            <p className="text-gray-600 text-lg">
              {getCasinoBonusMessage(selectedNumber)}
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-sm text-gray-500 mb-3 font-medium">Your Casino Lucky Number</p>
            <div className="text-6xl font-bold text-gray-900 mb-2">
              {selectedNumber}
            </div>
            <div className="flex items-center justify-center">
              <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${casinoTier.color} text-white text-sm font-bold`}>
                {casinoTier.tier}
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-3 text-lg">Your Casino Bonus Package</h3>
            <div className="space-y-2 text-left">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-700">${bonusAmount} Casino Welcome Bonus</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-700">Access to 500+ Casino Games</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-700">Live Dealer Games Access</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-700">{casinoTier.description}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Casino Bonus Terms:</strong> Your ${bonusAmount} casino bonus will be added when you make your first deposit. 
              Minimum deposit $20. 35x wagering requirement. Valid for casino games only.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-2xl border-0 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8 text-white text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Dice1 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Pick Your Casino Lucky Number</h2>
        <p className="text-white/90 text-lg">
          Choose a number and win an instant casino bonus! Higher numbers = bigger casino bonuses!
        </p>
      </div>

      <CardContent className="p-8">
        <div className="grid grid-cols-5 gap-3 mb-8">
          {numbers.map((number) => (
            <Button
              key={number}
              variant="outline"
              size="sm"
              onClick={() => handleNumberSelect(number)}
              disabled={isSpinning}
              className={`h-14 text-lg font-bold transition-all duration-200 ${
                selectedNumber === number 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg transform scale-105' 
                  : 'hover:bg-purple-50 hover:border-purple-300 hover:scale-105'
              }`}
            >
              {isSpinning && selectedNumber === number ? (
                <div className="animate-spin text-xl">🎰</div>
              ) : (
                number
              )}
            </Button>
          ))}
        </div>
        
        {isSpinning && (
          <div className="text-center py-8">
            <div className="relative">
              <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Dice1 className="w-6 h-6 text-purple-500 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-purple-600 mb-2">Calculating Your Casino Bonus...</h3>
            <p className="text-gray-600">The higher your number, the bigger your casino bonus!</p>
          </div>
        )}
        
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Gift className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-gray-700 font-medium">Casino Bonus: $50 - $300</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-gray-700 font-medium">Higher Numbers = Bigger Bonuses</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-400">1-15</div>
            <div className="text-sm text-gray-600">Silver Casino</div>
            <div className="text-xs text-gray-500">$50-100</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">16-25</div>
            <div className="text-sm text-gray-600">Gold Casino</div>
            <div className="text-xs text-gray-500">$100-150</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">26-40</div>
            <div className="text-sm text-gray-600">Premium Casino</div>
            <div className="text-xs text-gray-500">$150-250</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">41-50</div>
            <div className="text-sm text-gray-600">Mega Casino</div>
            <div className="text-xs text-gray-500">$250-300</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
