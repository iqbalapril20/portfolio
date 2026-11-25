import { renderPortfolioOgImage } from '@/lib/ogImage';

export const runtime = 'nodejs';
export const alt = 'Muchammad Iqbal Aprilianto - Full-Stack Web Developer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return renderPortfolioOgImage();
}
