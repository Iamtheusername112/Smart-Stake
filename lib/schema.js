import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, json, uuid } from 'drizzle-orm/pg-core';

// Leads table - core lead capture
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  age: integer('age'),
  country: varchar('country', { length: 100 }),
  preferredGames: json('preferred_games'), // Array of game preferences
  riskLevel: varchar('risk_level', { length: 20 }), // low, medium, high
  leadScore: integer('lead_score').default(0), // 0-100 scoring system
  source: varchar('source', { length: 100 }), // organic, paid, referral
  utmSource: varchar('utm_source', { length: 100 }),
  utmMedium: varchar('utm_medium', { length: 100 }),
  utmCampaign: varchar('utm_campaign', { length: 100 }),
  isVerified: boolean('is_verified').default(false),
  isDeposited: boolean('is_deposited').default(false),
  totalDeposits: decimal('total_deposits', { precision: 10, scale: 2 }).default('0'),
  lastActivity: timestamp('last_activity'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Affiliate tracking
export const affiliateLinks = pgTable('affiliate_links', {
  id: serial('id').primaryKey(),
  leadId: integer('lead_id').references(() => leads.id),
  affiliateProgram: varchar('affiliate_program', { length: 100 }).notNull(),
  affiliateUrl: text('affiliate_url').notNull(),
  clickCount: integer('click_count').default(0),
  conversionCount: integer('conversion_count').default(0),
  commissionEarned: decimal('commission_earned', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow()
});

// Email campaigns
export const emailCampaigns = pgTable('email_campaigns', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // welcome, reminder, bonus, etc.
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow()
});

// Email sends tracking
export const emailSends = pgTable('email_sends', {
  id: serial('id').primaryKey(),
  leadId: integer('lead_id').references(() => leads.id),
  campaignId: integer('campaign_id').references(() => emailCampaigns.id),
  sentAt: timestamp('sent_at').defaultNow(),
  openedAt: timestamp('opened_at'),
  clickedAt: timestamp('clicked_at'),
  unsubscribedAt: timestamp('unsubscribed_at')
});

// Gamification activities
export const gamificationActivities = pgTable('gamification_activities', {
  id: serial('id').primaryKey(),
  leadId: integer('lead_id').references(() => leads.id),
  activityType: varchar('activity_type', { length: 50 }).notNull(), // lucky_number, quiz, spin
  activityData: json('activity_data'), // Store activity-specific data
  pointsEarned: integer('points_earned').default(0),
  createdAt: timestamp('created_at').defaultNow()
});

// Analytics events
export const analyticsEvents = pgTable('analytics_events', {
  id: serial('id').primaryKey(),
  leadId: integer('lead_id').references(() => leads.id),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  eventData: json('event_data'),
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 45 }),
  createdAt: timestamp('created_at').defaultNow()
});

// Revenue tracking
export const revenueTracking = pgTable('revenue_tracking', {
  id: serial('id').primaryKey(),
  leadId: integer('lead_id').references(() => leads.id),
  affiliateProgram: varchar('affiliate_program', { length: 100 }).notNull(),
  conversionType: varchar('conversion_type', { length: 50 }).notNull(), // signup, deposit, first_bet
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  commission: decimal('commission', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  status: varchar('status', { length: 20 }).default('pending'), // pending, confirmed, paid
  trackingId: varchar('tracking_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
});

// Landing pages
export const landingPages = pgTable('landing_pages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  content: text('content').notNull(),
  isActive: boolean('is_active').default(true),
  conversionRate: decimal('conversion_rate', { precision: 5, scale: 2 }).default('0'),
  totalVisits: integer('total_visits').default(0),
  totalConversions: integer('total_conversions').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Traffic sources
export const trafficSources = pgTable('traffic_sources', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // organic, paid, social, referral
  platform: varchar('platform', { length: 100 }), // google, facebook, tiktok, etc.
  costPerClick: decimal('cost_per_click', { precision: 10, scale: 4 }),
  costPerConversion: decimal('cost_per_conversion', { precision: 10, scale: 2 }),
  totalSpent: decimal('total_spent', { precision: 10, scale: 2 }).default('0'),
  totalClicks: integer('total_clicks').default(0),
  totalConversions: integer('total_conversions').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow()
});

// User segments
export const userSegments = pgTable('user_segments', {
  id: serial('id').primaryKey(),
  leadId: integer('lead_id').references(() => leads.id),
  segmentName: varchar('segment_name', { length: 100 }).notNull(),
  segmentData: json('segment_data'),
  assignedAt: timestamp('assigned_at').defaultNow()
});
