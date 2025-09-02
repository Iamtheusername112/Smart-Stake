'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Gift, Trophy } from 'lucide-react';

export default function LuckyNumberPicker({ onNumberPicked, isComplete }) {
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
      
      // Calculate bonus based on number (higher numbers = higher bonuses)
      const bonus = Math.floor(number * 2.5) + Math.floor(Math.random() * 50);
      setBonusAmount(bonus);
      
      onNumberPicked(number, bonus);
    }, 2000);
  };

  const getBonusMessage = (number) => {
    if (number >= 40) return "🎉 MEGA BONUS! You're a high roller!";
    if (number >= 25) return "🔥 Great choice! Big bonus incoming!";
    if (number >= 15) return "⭐ Nice pick! You've got luck on your side!";
    return "🎯 Good start! Every number brings rewards!";
  };

  if (showResult) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-green-800">
            Congratulations! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-3xl font-bold text-green-600">
            ${bonusAmount} Bonus
          </div>
          <p className="text-gray-600">
            {getBonusMessage(selectedNumber)}
          </p>
          <div className="bg-white p-4 rounded-lg border-2 border-dashed border-green-300">
            <p className="text-sm text-gray-500 mb-2">Your Lucky Number:</p>
            <div className="text-4xl font-bold text-green-600">
              {selectedNumber}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            This bonus will be added to your account when you make your first deposit!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-purple-800">
          Pick Your Lucky Number
        </CardTitle>
        <p className="text-gray-600">
          Choose a number and win an instant bonus! Higher numbers = bigger bonuses!
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {numbers.map((number) => (
            <Button
              key={number}
              variant={selectedNumber === number ? "gradient" : "outline"}
              size="sm"
              onClick={() => handleNumberSelect(number)}
              disabled={isSpinning}
              className={`h-12 text-lg font-bold ${
                selectedNumber === number 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'hover:bg-purple-100'
              }`}
            >
              {isSpinning && selectedNumber === number ? (
                <div className="animate-spin">🎯</div>
              ) : (
                number
              )}
            </Button>
          ))}
        </div>
        
        {isSpinning && (
          <div className="text-center py-4">
            <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-purple-600 font-medium">Calculating your bonus...</p>
          </div>
        )}
        
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Gift className="w-4 h-4" />
            <span>Bonus range: $25 - $200</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
