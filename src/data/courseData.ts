import { Course } from '../types/index.ts';

export const MONI_COURSE: Course = {
  id: 'moni-dm-mastery',
  title: 'Moni Digital Marketing Mastery & Agency Blueprint',
  tagline: 'Master Performance Ads, SEO, AI Growth Marketing, and High-Converting Funnels to Scale Businesses & High-Paying Clients.',
  description: 'The ultimate practical, hands-on digital marketing program engineered by Moni Digital Marketing Solutions. Covers end-to-end client acquisition, Meta & Google ad algorithms, technical SEO, conversion rate optimization, GA4 tracking, and AI automation.',
  price: 5999,
  originalPrice: 14999,
  payeeUpiId: 'edtingarts-2@oksbi',
  modulesCount: 8,
  totalDuration: '48+ Hours of In-depth Training',
  certificateProvided: true,
  category: 'Flagship Masterclass',
  badge: 'Best Seller',
  features: [
    'Complete 8-Module Comprehensive Curriculum',
    'Performance Meta & Google Ads Blueprint',
    'Technical SEO & Core Web Vitals SOPs',
    'Agency Client Acquisition Contracts & Pitch Decks',
    'Verified Industry Certificate of Completion',
  ],
  modules: [
    {
      id: 'mod-1',
      title: 'Module 1: Modern Digital Marketing Architecture & Strategy',
      duration: '5h 30m',
      description: 'Foundations of omnichannel growth, buyer personas, customer journey mapping, and value propositions.',
      lessons: [
        {
          id: 'l-1-1',
          title: 'The Full-Funnel Growth Framework (TOFU, MOFU, BOFU)',
          duration: '35m',
          type: 'video',
          description: 'Understanding how paid, organic, and retention channels work together synergistically.',
          keyTakeaways: ['Omnichannel customer journey mapping', 'Attribution modeling basics', 'CAC to LTV health metrics'],
          isFreePreview: true,
        },
        {
          id: 'l-1-2',
          title: 'Crafting High-Converting Market Positioning & ICP',
          duration: '45m',
          type: 'video',
          description: 'Step-by-step framework to identify high-ticket client avatars and positioning your offer.',
          keyTakeaways: ['Ideal Customer Profile (ICP) worksheet', 'Competitor gap analysis matrix', 'Offer creation formulas'],
        },
        {
          id: 'l-1-3',
          title: 'Digital Marketing Strategy Deck & Template',
          duration: '15m',
          type: 'resource',
          description: 'Downloadable client strategy blueprint used by 7-figure marketing agencies.',
          keyTakeaways: ['Ready-to-use client pitch deck', 'Quarterly roadmap spreadsheet', 'Budget allocation calculator'],
          resourceDownloadName: 'Moni_Marketing_Strategy_Blueprint_2026.pdf',
        },
      ],
    },
    {
      id: 'mod-2',
      title: 'Module 2: Meta Ads Mastery (Facebook & Instagram Ads 2026)',
      duration: '8h 15m',
      description: 'Master Meta Advantage+ campaigns, CBO/ABO budgets, dynamic creatives, pixel diagnostics, and Conversions API (CAPI).',
      lessons: [
        {
          id: 'l-2-1',
          title: 'Meta Pixel & Conversions API (CAPI) Bulletproof Setup',
          duration: '50m',
          type: 'video',
          description: 'Server-side event tracking, deduplication, custom conversions, and domain verification.',
          keyTakeaways: ['Server-side event dispatching', 'Event Quality Score optimization (8.5+ target)', 'First-party cookie safeguards'],
        },
        {
          id: 'l-2-2',
          title: 'Advantage+ Shopping Campaigns & Creative Testing Matrix',
          duration: '65m',
          type: 'video',
          description: 'How to scale campaigns past ₹50,000/day without ad fatigue using modular creative frameworks.',
          keyTakeaways: ['3:2:2 Dynamic Creative Testing framework', 'Hook rate & Hold rate diagnostic benchmarks', 'Vertical video scaling frameworks'],
        },
        {
          id: 'l-2-3',
          title: 'High-Converting Ad Copy & Hook Swipe Files',
          duration: '20m',
          type: 'resource',
          description: '100+ proven hooks, direct-response frameworks, and UGC script outlines.',
          keyTakeaways: ['Problem-Agitate-Solve copy scripts', 'UGC creator briefing sheet', 'Compliance & account ban protection guide'],
          resourceDownloadName: 'Meta_Ads_Hooks_Swipefile.pdf',
        },
      ],
    },
    {
      id: 'mod-3',
      title: 'Module 3: Google Ads (Search, Performance Max & YouTube)',
      duration: '7h 45m',
      description: 'High-intent search capture, negative keyword sculpturing, Performance Max asset groups, and smart bidding algorithms.',
      lessons: [
        {
          id: 'l-3-1',
          title: 'Search Intent Architecture & Negative Keyword Sculpting',
          duration: '55m',
          type: 'video',
          description: 'Capturing bottom-funnel buyers with high ROAS and zero wasted budget on broad match.',
          keyTakeaways: ['Single Theme Ad Groups (STAG) strategy', 'Tiered negative match list implementation', 'Quality Score 9/10 checklist'],
        },
        {
          id: 'l-3-2',
          title: 'Performance Max (PMax) Campaigns Masterclass',
          duration: '60m',
          type: 'video',
          description: 'Asset group optimization, audience signals, feed management for eCommerce, and search theme injection.',
          keyTakeaways: ['Target ROAS vs Target CPA thresholds', 'Excluding brand queries from PMax', 'Asset strength optimization'],
        },
      ],
    },
    {
      id: 'mod-4',
      title: 'Module 4: Search Engine Optimization (Technical, On-Page & AI SEO)',
      duration: '6h 30m',
      description: 'Dominating organic search in the age of AI overviews, semantic search, schema markup, and high-authority link acquisition.',
      lessons: [
        {
          id: 'l-4-1',
          title: 'Information Gain & Semantic Search in Modern SEO',
          duration: '50m',
          type: 'video',
          description: 'Ranking above AI summaries with proprietary data, entities, schema, and original expertise.',
          keyTakeaways: ['Schema.org JSON-LD structured data mastery', 'Entity-based keyword clustering', 'Topical authority maps'],
        },
        {
          id: 'l-4-2',
          title: 'Core Web Vitals & Technical Crawl Audits',
          duration: '45m',
          type: 'video',
          description: 'Screaming Frog crawl diagnostics, canonicalization, log analysis, and rendering performance.',
          keyTakeaways: ['Fixing crawl budget leaks', 'Core Web Vitals (INP, LCP, CLS) optimization', 'Internal link architecture'],
        },
      ],
    },
    {
      id: 'mod-5',
      title: 'Module 5: Analytics, GA4, & Conversion Rate Optimization (CRO)',
      duration: '5h 45m',
      description: 'Google Analytics 4 custom exploration reports, Tag Manager triggers, heatmap analysis, and checkout funnel optimization.',
      lessons: [
        {
          id: 'l-5-1',
          title: 'GA4 Custom Events & Exploration Reports',
          duration: '55m',
          type: 'video',
          description: 'Building custom funnels, user retention cohorts, and cross-channel attribution dashboards.',
          keyTakeaways: ['GTM dataLayer event dispatching', 'Path exploration & drop-off analysis', 'UTM tracking parameter standardization'],
        },
        {
          id: 'l-5-2',
          title: 'Landing Page Conversion Rate Optimization (CRO)',
          duration: '45m',
          type: 'video',
          description: 'Turning 1.5% landing page conversion rates into 4.8%+ with visual hierarchy and trust signals.',
          keyTakeaways: ['Above-the-fold friction elimination', 'Social proof placement triggers', 'Mobile checkout optimization rules'],
        },
      ],
    },
    {
      id: 'mod-6',
      title: 'Module 6: Email Marketing, Automations & Retention',
      duration: '4h 50m',
      description: 'Klaviyo & Mailchimp automated flows, segmentation, deliverability, warm-up protocols, and broadcast strategies.',
      lessons: [
        {
          id: 'l-6-1',
          title: 'The 5 Essential Automated Email Flows That Generate 30% of Revenue',
          duration: '50m',
          type: 'video',
          description: 'Welcome series, abandoned cart recovery, browse abandonment, post-purchase winback, and VIP rewards.',
          keyTakeaways: ['Dynamic cart recovery trigger timing', 'Subject line open-rate split tests', 'Spam filter & DMARC/DKIM compliance'],
        },
      ],
    },
    {
      id: 'mod-7',
      title: 'Module 7: AI Automation Tools for Marketers',
      duration: '5h 15m',
      description: 'Using Gemini and AI automation pipelines to 10x content production, ad copy iterations, and customer support workflows.',
      lessons: [
        {
          id: 'l-7-1',
          title: 'Automated Creative Production & Prompt Engineering',
          duration: '40m',
          type: 'video',
          description: 'Building automated workflows that generate hundreds of targeted creative angles in minutes.',
          keyTakeaways: ['System prompt chaining for marketing angles', 'Bulk social media copy generation', 'Automated SEO brief pipelines'],
        },
      ],
    },
    {
      id: 'mod-8',
      title: 'Module 8: Agency Client Acquisition & Freelance Business Scaling',
      duration: '6h 00m',
      description: 'How to pitch, close, and retain high-ticket clients (₹50k - ₹2L/month retainers) with contracts and delivery standard operating procedures (SOPs).',
      lessons: [
        {
          id: 'l-8-1',
          title: 'High-Ticket Client Outreach & Cold Audit Framework',
          duration: '60m',
          type: 'video',
          description: 'Loom video audit strategy that gets a 30%+ response rate from e-commerce brands and local businesses.',
          keyTakeaways: ['The 5-minute video audit script', 'Pricing retainers vs performance revenue share', 'Client onboarding SOP templates'],
        },
        {
          id: 'l-8-2',
          title: 'Client Service Agreements & Legal Contracts Pack',
          duration: '20m',
          type: 'resource',
          description: 'Attorney-reviewed agency contract templates, confidentiality NDAs, and payment terms.',
          keyTakeaways: ['Scope of work (SOW) boundary clauses', 'Net-15 payment penalty clauses', 'IP transfer agreements'],
          resourceDownloadName: 'Moni_Agency_Legal_Contracts_Pack.pdf',
        },
      ],
    },
  ],
};

// 1. Google Ads Course — ₹1,400
export const GOOGLE_ADS_COURSE: Course = {
  id: 'google-ads-course',
  title: 'Google Ads Course',
  tagline: 'High-Intent Search, Performance Max, YouTube Ads & Negative Keyword Sculpting for Maximum ROAS.',
  description: 'In-depth practical training dedicated purely to Google Ads. Master Search Campaign architecture, Performance Max asset groups, high-converting copy, bid strategies, and negative match list optimization to generate low-cost leads and e-commerce purchases.',
  price: 1400,
  originalPrice: 3499,
  payeeUpiId: 'edtingarts-2@oksbi',
  modulesCount: 4,
  totalDuration: '14+ Hours Practical Training',
  certificateProvided: true,
  category: 'Specialized Course',
  badge: 'Popular',
  features: [
    'Search Network Single Theme Ad Groups (STAG)',
    'Performance Max (PMax) Feed & Asset Optimization',
    'Negative Keyword Master List (1,000+ Waste Terms)',
    'Target CPA & Target ROAS Smart Bidding Algorithms',
    'Real Campaign Setup & Live Audits',
  ],
  modules: [
    {
      id: 'g-mod-1',
      title: 'Module 1: Search Intent & Campaign Architecture',
      duration: '3h 30m',
      description: 'Keyword research, Match types (Exact, Phrase, Broad with audience signals), and STAG structure.',
      lessons: [
        {
          id: 'g-l-1-1',
          title: 'Keyword Match Type Evolution & Quality Score Maximization',
          duration: '45m',
          type: 'video',
          description: 'How to achieve 8/10+ Quality Score and slash Cost Per Click (CPC).',
          keyTakeaways: ['Ad relevance alignment', 'Expected CTR boosting techniques', 'Landing page experience signals'],
          isFreePreview: true,
        },
        {
          id: 'g-l-1-2',
          title: 'Negative Keyword Sculpting Masterfile',
          duration: '30m',
          type: 'resource',
          description: 'Ready-to-import negative keyword lists to immediately eliminate wasted clicks.',
          keyTakeaways: ['Job search negatives', 'Free / cracked query exclusions', 'Competitor brand sculpting'],
          resourceDownloadName: 'Google_Ads_Negative_Keywords_Masterfile.csv',
        },
      ],
    },
    {
      id: 'g-mod-2',
      title: 'Module 2: Performance Max (PMax) Mastery',
      duration: '4h 00m',
      description: 'Building multi-channel asset groups, audience signals, and brand exclusion lists.',
      lessons: [
        {
          id: 'g-l-2-1',
          title: 'PMax Campaign Structure from ₹500 to ₹50,000/Day',
          duration: '55m',
          type: 'video',
          description: 'Step-by-step setup of high-performing PMax campaigns with search themes.',
          keyTakeaways: ['Asset group strength optimization', 'Customer Match upload protocols', 'Excluding brand cannibalization'],
        },
      ],
    },
    {
      id: 'g-mod-3',
      title: 'Module 3: Conversion Tracking & Enhanced Conversions',
      duration: '3h 15m',
      description: 'Google Tag Manager server-side and client-side conversion tracking setup.',
      lessons: [
        {
          id: 'g-l-3-1',
          title: 'Enhanced Conversions with GTM',
          duration: '45m',
          type: 'video',
          description: 'First-party user data hashing (SHA-256) for precision attribution.',
          keyTakeaways: ['Form submit tags', 'Phone call conversion triggers', 'Value-based attribution'],
        },
      ],
    },
    {
      id: 'g-mod-4',
      title: 'Module 4: YouTube & Video Action Campaigns',
      duration: '3h 15m',
      description: 'Direct-response video creative frameworks and skippable in-stream scaling.',
      lessons: [
        {
          id: 'g-l-4-1',
          title: 'YouTube Direct Response Ad Scripts',
          duration: '40m',
          type: 'resource',
          description: 'High-converting video scripts for leads and product sales.',
          keyTakeaways: ['The 5-second hook rule', 'Call to Action overlays', 'Companion banner specs'],
        },
      ],
    },
  ],
};

// 2. Shopshfly Online Selling Business Website — ₹999
export const SHOPSHFLY_PRODUCT: Course = {
  id: 'shopshfly-business-website',
  title: 'Shopshfly Online Selling Business Website',
  tagline: 'Turnkey E-Commerce Business Website with Automated Product Sourcing & High-Converting Storefront.',
  description: 'Complete ready-to-launch Shopshfly online selling business website solution. Get a high-converting, mobile-responsive e-commerce storefront with integrated product catalog structure, payment checkout layout, supplier connections, and marketing conversion boosters.',
  price: 999,
  originalPrice: 2999,
  payeeUpiId: 'edtingarts-2@oksbi',
  modulesCount: 3,
  totalDuration: 'Complete Business Setup Package + Guides',
  certificateProvided: true,
  category: 'Business Website & System',
  badge: 'Hot Offer',
  features: [
    'Ready-to-Deploy E-Commerce Storefront Template',
    'Mobile-Optimized High-Speed Product Pages',
    'Integrated UPI & Payment Gateway Setup Guide',
    'Top 50 High-Margin Winning Product Catalog Data',
    'Supplier Order Fulfillment Standard Operating Procedures',
  ],
  modules: [
    {
      id: 's-mod-1',
      title: 'Module 1: Store Setup & Design Customization',
      duration: '2h 30m',
      description: 'Setting up domain, branding, mobile navigation, and high-trust homepage layouts.',
      lessons: [
        {
          id: 's-l-1-1',
          title: 'Storefront Architecture & Instant Deployment',
          duration: '35m',
          type: 'video',
          description: 'Configuring the Shopshfly e-commerce theme for sub-2 second page loads.',
          keyTakeaways: ['Mobile banner optimization', 'Trust badge placements', 'Sticky checkout button activation'],
          isFreePreview: true,
        },
        {
          id: 's-l-1-2',
          title: 'Shopshfly Theme Assets & Graphic Pack',
          duration: '15m',
          type: 'resource',
          description: 'High-resolution banners, collection graphics, and icons ready for upload.',
          keyTakeaways: ['Canva banner templates', 'Trust icons pack', 'Product showcase badges'],
          resourceDownloadName: 'Shopshfly_Store_Assets_Pack.zip',
        },
      ],
    },
    {
      id: 's-mod-2',
      title: 'Module 2: Winning Product Sourcing & Catalog Integration',
      duration: '2h 45m',
      description: 'Selecting profitable trending products with 3x-5x markup margins from reliable verified suppliers.',
      lessons: [
        {
          id: 's-l-2-1',
          title: 'Top 50 High-Margin Indian E-Commerce Products List',
          duration: '40m',
          type: 'resource',
          description: 'Curated spreadsheet of tested products with supplier links and cost breakdowns.',
          keyTakeaways: ['COD RTO risk mitigation', 'Margin calculation spreadsheet', 'Wholesale supplier contacts'],
          resourceDownloadName: 'Top_50_Winning_Products_Directory_2026.xlsx',
        },
      ],
    },
    {
      id: 's-mod-3',
      title: 'Module 3: Order Processing & Shipping Automation',
      duration: '2h 00m',
      description: 'Automating logistics with courier aggregators (Shiprocket, Delhivery) and reducing RTO rates.',
      lessons: [
        {
          id: 's-l-3-1',
          title: 'Zero-RTO Strategy & Automated WhatsApp Order Confirmation',
          duration: '35m',
          type: 'video',
          description: 'How to verify COD orders via WhatsApp Bot and cut returns by 40%.',
          keyTakeaways: ['Pre-dispatch address validation', 'Automated NDR follow-ups', 'Courier SLA tracking'],
        },
      ],
    },
  ],
};

// 3. Measso Online Selling Business — ₹999
export const MEASSO_PRODUCT: Course = {
  id: 'measso-selling-business',
  title: 'Measso Online Selling Business',
  tagline: 'Zero-Investment Social Commerce & Reselling Growth Masterclass & Supplier Network.',
  description: 'Launch and scale your Measso online selling business from zero to 50+ daily profitable orders. Master social media product discovery, viral video marketing on Instagram and Facebook, customer retention funnels, and zero-inventory fulfillment systems.',
  price: 999,
  originalPrice: 2999,
  payeeUpiId: 'edtingarts-2@oksbi',
  modulesCount: 3,
  totalDuration: '8+ Hours Training + Supplier Network',
  certificateProvided: true,
  category: 'Reselling & Commerce System',
  badge: 'Best Value',
  features: [
    'Zero-Investment Catalog Selling Methodology',
    'Instagram Reels Viral Traffic Blueprint for Products',
    'WhatsApp VIP Broadcast Customer Funnel',
    'Handling Customer Returns & Profit Margin Accounting',
    'Direct Manufacturer & Wholesaler Network List',
  ],
  modules: [
    {
      id: 'm-mod-1',
      title: 'Module 1: Measso Platform Foundations & Margin Structuring',
      duration: '2h 15m',
      description: 'Account setup, setting competitive retail margins, and selecting high-demand fashion & lifestyle catalogs.',
      lessons: [
        {
          id: 'm-l-1-1',
          title: 'Identifying Top-Converting Categories with High Reorder Rates',
          duration: '40m',
          type: 'video',
          description: 'How to choose products with consistent quality and low return percentage.',
          keyTakeaways: ['Category trend analysis', 'Rating threshold filters (4.2+ target)', 'Sizing clarity checks'],
          isFreePreview: true,
        },
      ],
    },
    {
      id: 'm-mod-2',
      title: 'Module 2: Organic Viral Traffic (Reels & Facebook Groups)',
      duration: '3h 15m',
      description: 'Generate 1,000+ daily store visits with zero ad spend using organic content repurposing.',
      lessons: [
        {
          id: 'm-l-2-1',
          title: 'Viral Product Showcase Format that Generates Inquiries',
          duration: '50m',
          type: 'video',
          description: 'Creating 15-second product demonstration videos that drive direct messages.',
          keyTakeaways: ['Audio trend tagging', 'Call to action caption templates', 'DM automation setup'],
        },
        {
          id: 'm-l-2-2',
          title: 'Social Selling Script & DM Closing Swipe Files',
          duration: '20m',
          type: 'resource',
          description: 'Proven chat scripts to convert product inquiries into prepaid or COD orders.',
          keyTakeaways: ['Objection handling scripts', 'Urgency trigger templates', 'Upsell bundle scripts'],
          resourceDownloadName: 'Measso_Chat_Sales_Scripts.pdf',
        },
      ],
    },
    {
      id: 'm-mod-3',
      title: 'Module 3: Scaling with WhatsApp Communities & Reorders',
      duration: '2h 30m',
      description: 'Building an owned audience of repeat buyers to generate predictable monthly income.',
      lessons: [
        {
          id: 'm-l-3-1',
          title: 'Building 1,000+ Member VIP Customer Broadcast Groups',
          duration: '45m',
          type: 'video',
          description: 'Weekly drops, early-bird flash sales, and customer loyalty reward systems.',
          keyTakeaways: ['Group rules and engagement prompts', 'Flash sale scheduling', 'Retention rate tracking'],
        },
      ],
    },
  ],
};

// Optional 3-Product Bundle: Total ₹3,398 (1400 + 999 + 999)
export const THREE_PRODUCTS_BUNDLE: Course = {
  id: 'all-3-products-bundle',
  title: 'All 3 Growth Products Bundle',
  tagline: 'Google Ads Course (₹1,400) + Shopshfly Website (₹999) + Measso Business (₹999) in One Mega Pack.',
  description: 'Get all three high-demand growth products together at their exact combined price: Google Ads mastery, turnkey Shopshfly e-commerce storefront, and Measso zero-investment social commerce business. Immediate access upon admin verification.',
  price: 3398,
  originalPrice: 9497,
  payeeUpiId: 'edtingarts-2@oksbi',
  modulesCount: 10,
  totalDuration: 'Complete 3-in-1 Suite',
  certificateProvided: true,
  category: 'Bundle Deal',
  badge: 'Complete Suite',
  features: [
    'Google Ads Course Full Access (Worth ₹1,400)',
    'Shopshfly Business Website & Assets (Worth ₹999)',
    'Measso Online Selling Business System (Worth ₹999)',
    'Exact Combined Price: ₹3,398 (No Extra Charges)',
    'Full Verified Access across all 3 portals',
  ],
  modules: [
    ...GOOGLE_ADS_COURSE.modules,
    ...SHOPSHFLY_PRODUCT.modules,
    ...MEASSO_PRODUCT.modules,
  ],
};

// All available offerings
export const ALL_PRODUCTS: Course[] = [
  MONI_COURSE,           // ₹5,999 Flagship
  GOOGLE_ADS_COURSE,     // ₹1,400
  SHOPSHFLY_PRODUCT,     // ₹999
  MEASSO_PRODUCT,        // ₹999
  THREE_PRODUCTS_BUNDLE, // ₹3,398 Total Bundle
];
