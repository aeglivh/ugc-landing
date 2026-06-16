export type Service = {
  title: string;
  description: string;
  /** Optional starting price, e.g. "From €350" */
  price?: string;
};

export const services: Service[] = [
  {
    title: 'Product demos',
    description: 'Clear, founder-style walkthroughs of your SaaS or AI tool. Screen-record + talking head, edited tight.',
    price: 'From €350',
  },
  {
    title: 'Explainer videos',
    description: 'Turn an abstract product (workflows, AI features) into a 60-second pitch anyone can follow.',
    price: 'From €450',
  },
  {
    title: 'Social ads',
    description: 'Hook-driven creative for LinkedIn, X, Reddit, and YouTube pre-roll. Built for B2B feeds, not consumer scrolls.',
    price: 'From €400',
  },
  {
    title: 'Testimonials / case studies',
    description: 'Customer-side videos that lift social proof on landing pages, ads, and sales decks.',
    price: 'From €350',
  },
];

export type Step = { number: string; title: string; description: string };

export const process: Step[] = [
  { number: '01', title: 'Brief',    description: 'You send the product + key points. I send back a shotlist and treatment within 24h.' },
  { number: '02', title: 'Concept',  description: 'We align on hook, structure, and CTAs. One round of revisions before we shoot.' },
  { number: '03', title: 'Shoot',    description: 'Filmed on iPhone 15 Pro with studio lighting. Natural delivery, scripted beats.' },
  { number: '04', title: 'Delivery', description: 'Edited 9:16 + 1:1 files delivered in 3–5 days. Two rounds of edits included.' },
];

export type Niche = { label: string; value: string };

export const niches: Niche[] = [
  { label: 'B2B SaaS', value: 'b2b-saas' },
  { label: 'AI Tools', value: 'ai-tools' },
];
