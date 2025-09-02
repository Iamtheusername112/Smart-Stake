import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function generateLeadScore(lead) {
  let score = 0;
  
  // Email domain scoring
  if (lead.email) {
    const domain = lead.email.split('@')[1];
    const premiumDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    if (premiumDomains.includes(domain)) score += 10;
  }
  
  // Phone number presence
  if (lead.phone) score += 15;
  
  // Age scoring (18-35 is highest value for gambling)
  if (lead.age) {
    if (lead.age >= 18 && lead.age <= 35) score += 20;
    else if (lead.age >= 36 && lead.age <= 50) score += 15;
    else if (lead.age >= 51) score += 10;
  }
  
  // Country scoring (adjust based on your target markets)
  const highValueCountries = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES'];
  if (lead.country && highValueCountries.includes(lead.country)) score += 15;
  
  // Game preferences
  if (lead.preferredGames && lead.preferredGames.length > 0) score += 10;
  
  // Risk level
  if (lead.riskLevel === 'high') score += 20;
  else if (lead.riskLevel === 'medium') score += 10;
  
  return Math.min(score, 100);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function getRandomLuckyNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export function generateReferralCode(email) {
  const hash = email.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return `SMART${Math.abs(hash).toString(36).toUpperCase().slice(0, 6)}`;
}
