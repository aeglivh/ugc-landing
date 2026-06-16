/**
 * Brands you've worked with. Drop a logo PNG/SVG into /public/brands
 * (kept dark on cream — solid black versions work best).
 */

export type Brand = {
  name: string;
  /** path relative to /public, e.g. '/brands/acme.svg'. Leave undefined for text-only chip. */
  logo?: string;
};

export const brands: Brand[] = [
  { name: 'Brand one' },
  { name: 'Brand two' },
  { name: 'Brand three' },
  { name: 'Brand four' },
  { name: 'Brand five' },
  { name: 'Brand six' },
];
