import { detectBot, shield, tokenBucket, validateEmail } from '@arcjet/nest';

export interface ArcjetRuleConfig {
  rateLimit: ReturnType<typeof tokenBucket>;
  botDetection: ReturnType<typeof detectBot>;
  emailValidation: ReturnType<typeof validateEmail>;
  shield: ReturnType<typeof shield>;
}

/**
 * Global Arcjet Rules
 * Applied to all routes
 */
export const globalRules = [
  shield({
    mode: process.env.ARCJET_MODE === 'DRY_RUN' ? 'DRY_RUN' : 'LIVE',
  }),
];

/**
 * Rate Limiting Rules
 */
export const rateLimitRules = {
  // General API rate limit
  general: tokenBucket({
    mode: process.env.ARCJET_MODE === 'DRY_RUN' ? 'DRY_RUN' : 'LIVE',
    refillRate: 10,
    interval: 60,
    capacity: 20,
    characteristics: ['ip'],
  }),

  // Strict rate limit for auth endpoints
  auth: tokenBucket({
    mode: process.env.ARCJET_MODE === 'DRY_RUN' ? 'DRY_RUN' : 'LIVE',
    refillRate: 5,
    interval: 60,
    capacity: 10,
    characteristics: ['ip'],
  }),

  // Loose rate limit for public endpoints
  public: tokenBucket({
    mode: process.env.ARCJET_MODE === 'DRY_RUN' ? 'DRY_RUN' : 'LIVE',
    refillRate: 30,
    interval: 60,
    capacity: 50,
    characteristics: ['ip'],
  }),

  // Moderate rate limit for user endpoints
  user: tokenBucket({
    mode: process.env.ARCJET_MODE === 'DRY_RUN' ? 'DRY_RUN' : 'LIVE',
    refillRate: 15,
    interval: 60,
    capacity: 30,
    characteristics: ['ip', 'userId'],
  }),
};

/**
 * Bot Detection Rules
 * FREE PLAN: Available with full functionality
 */
export const botDetectionRules = {
  // Block all automated clients (strict)
  strict: detectBot({
    mode: process.env.ARCJET_MODE === 'DRY_RUN' ? 'DRY_RUN' : 'LIVE',
    allow: [], // Block everything except legitimate browsers
  }),

  // Allow search engines and monitoring
  moderate: detectBot({
    mode: process.env.ARCJET_MODE === 'DRY_RUN' ? 'DRY_RUN' : 'LIVE',
    allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:MONITOR'],
  }),

  // Allow most good bots
  lenient: detectBot({
    mode: process.env.ARCJET_MODE === 'DRY_RUN' ? 'DRY_RUN' : 'LIVE',
    allow: [
      'CATEGORY:SEARCH_ENGINE',
      'CATEGORY:MONITOR',
      'CATEGORY:SOCIAL',
      'CATEGORY:FEEDFETCHER',
    ],
  }),
};
export const arcjetModuleConfig = {
  isGlobal: true,
  key: process.env.ARCJET_KEY!,
  rules: globalRules,
};
