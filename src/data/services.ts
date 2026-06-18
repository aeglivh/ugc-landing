export type Service = {
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    title: 'Product demos',
    description: 'Screen-record + talking head walkthroughs. I read the docs, understand the product, and script something a technical buyer actually trusts.',
  },
  {
    title: 'Explainer videos',
    description: 'Turn a complex workflow or AI feature into a 60-second pitch anyone can follow. No dumbing down, no fluff.',
  },
  {
    title: 'Social ads',
    description: 'Hook-driven creative for LinkedIn, X, Reddit, and YouTube pre-roll. Built for B2B feeds and buyers who skip everything generic.',
  },
  {
    title: 'Testimonials / case studies',
    description: 'Customer-side video that adds real social proof to landing pages, ads, and sales decks.',
  },
];

export type Step = { number: string; title: string; description: string };

export const process: Step[] = [
  { number: '01', title: 'Brief',    description: 'You send the product and key points. I get back to you within 24 hours.' },
  { number: '02', title: 'Concept',  description: 'We align on hook, structure, and CTAs. One round of revisions before we shoot.' },
  { number: '03', title: 'Shoot',    description: 'Filmed with studio lighting. Natural delivery, scripted beats.' },
  { number: '04', title: 'Delivery', description: 'Edited 9:16 files delivered in 3 to 5 days. Two rounds of edits included.' },
];

export type Niche = { label: string; value: string };

export const niches: Niche[] = [
  { label: 'B2B SaaS', value: 'b2b-saas' },
  { label: 'AI Tools', value: 'ai-tools' },
  { label: 'FinTech',  value: 'fintech' },
];
