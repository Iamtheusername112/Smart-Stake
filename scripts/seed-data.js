const { db } = require('../lib/db.js');
const { emailCampaigns, trafficSources, landingPages } = require('../lib/schema.js');

async function seedData() {
  try {
    console.log('🌱 Seeding database with sample data...');

    // Seed email campaigns
    const campaigns = [
      {
        name: 'Welcome Series - Day 1',
        subject: 'Welcome to SmartStake! Your $100 bonus is ready 🎉',
        content: `
          <h1>Welcome to SmartStake, {{firstName}}!</h1>
          <p>Thank you for joining the smartest betting community online. Your $100 bonus is ready to claim!</p>
          <p>Here's what you get:</p>
          <ul>
            <li>✅ $100 instant bonus</li>
            <li>✅ Access to exclusive betting tips</li>
            <li>✅ VIP customer support</li>
            <li>✅ Daily promotions and offers</li>
          </ul>
          <p><a href="{{affiliateLink}}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Claim Your Bonus Now</a></p>
          <p>Best regards,<br>The SmartStake Team</p>
        `,
        type: 'welcome'
      },
      {
        name: 'Bonus Reminder - Day 3',
        subject: 'Don\'t forget your $100 bonus! ⏰',
        content: `
          <h1>Your bonus is waiting, {{firstName}}!</h1>
          <p>We noticed you haven't claimed your $100 bonus yet. Don't miss out on this exclusive offer!</p>
          <p>This bonus expires in 48 hours, so act fast!</p>
          <p><a href="{{affiliateLink}}" style="background: #DC2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Claim Now - Limited Time!</a></p>
          <p>Questions? Reply to this email and we'll help you out!</p>
          <p>Best regards,<br>The SmartStake Team</p>
        `,
        type: 'reminder'
      },
      {
        name: 'Re-engagement - Day 7',
        subject: 'We miss you! Come back for exclusive offers 💰',
        content: `
          <h1>We miss you, {{firstName}}!</h1>
          <p>It's been a week since you joined SmartStake, and we have some amazing new offers just for you!</p>
          <p>New this week:</p>
          <ul>
            <li>🎰 Casino bonus up to $500</li>
            <li>⚽ Sports betting cashback</li>
            <li>🎯 Daily free bets</li>
          </ul>
          <p><a href="{{affiliateLink}}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Check Out New Offers</a></p>
          <p>Best regards,<br>The SmartStake Team</p>
        `,
        type: 'reengagement'
      }
    ];

    for (const campaign of campaigns) {
      await db.insert(emailCampaigns).values(campaign);
      console.log(`✅ Created campaign: ${campaign.name}`);
    }

    // Seed traffic sources
    const sources = [
      {
        name: 'Google Ads - Casino Keywords',
        type: 'paid',
        platform: 'google',
        costPerClick: '2.50',
        costPerConversion: '25.00',
        totalSpent: '1250.00',
        totalClicks: 500,
        totalConversions: 50
      },
      {
        name: 'Facebook Ads - Sports Betting',
        type: 'paid',
        platform: 'facebook',
        costPerClick: '1.80',
        costPerConversion: '18.00',
        totalSpent: '900.00',
        totalClicks: 500,
        totalConversions: 50
      },
      {
        name: 'TikTok Organic - Gambling Tips',
        type: 'organic',
        platform: 'tiktok',
        costPerClick: null,
        costPerConversion: null,
        totalSpent: '0.00',
        totalClicks: 2000,
        totalConversions: 80
      },
      {
        name: 'Instagram Influencer - Sports',
        type: 'social',
        platform: 'instagram',
        costPerClick: '3.20',
        costPerConversion: '32.00',
        totalSpent: '800.00',
        totalClicks: 250,
        totalConversions: 25
      },
      {
        name: 'SEO - Betting Guides',
        type: 'organic',
        platform: 'google',
        costPerClick: null,
        costPerConversion: null,
        totalSpent: '0.00',
        totalClicks: 5000,
        totalConversions: 200
      }
    ];

    for (const source of sources) {
      await db.insert(trafficSources).values(source);
      console.log(`✅ Created traffic source: ${source.name}`);
    }

    // Seed landing pages
    const pages = [
      {
        name: 'Main Landing Page',
        slug: 'main',
        title: 'SmartStake - Smart Betting, Bigger Wins',
        description: 'Join thousands of smart bettors and get your $100 bonus instantly',
        content: 'Main landing page content...',
        conversionRate: '12.5',
        totalVisits: 10000,
        totalConversions: 1250
      },
      {
        name: 'Casino Landing Page',
        slug: 'casino',
        title: 'Casino Bonus - $200 Free Play',
        description: 'Get your $200 casino bonus and play the best slots and table games',
        content: 'Casino landing page content...',
        conversionRate: '15.2',
        totalVisits: 5000,
        totalConversions: 760
      },
      {
        name: 'Sports Landing Page',
        slug: 'sports',
        title: 'Sports Betting - $300 Bonus',
        description: 'Bet on your favorite sports with our $300 welcome bonus',
        content: 'Sports landing page content...',
        conversionRate: '18.7',
        totalVisits: 3000,
        totalConversions: 561
      }
    ];

    for (const page of pages) {
      await db.insert(landingPages).values(page);
      console.log(`✅ Created landing page: ${page.name}`);
    }

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedData();
