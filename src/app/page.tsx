import { JsonLd } from '@/shared/ui';
import { AboutSection } from '@/widgets/about-section';
import { ContactSection } from '@/widgets/contact-section';
import { Hero } from '@/widgets/hero';
import { MarqueeStrip } from '@/widgets/marquee-strip';
import { PortfolioSection } from '@/widgets/portfolio-section';
import { ServicesSection } from '@/widgets/services-section';

import { JSON_LD } from './json-ld';

/**
 * Одностраничник: секции идут в порядке меню, шапка ведёт на них якорями
 * (`SECTION_ID` в `shared/config/nav.ts`). Structured data — здесь, а не в
 * layout'е: на 404 граф страницы-профиля не нужен.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={JSON_LD} />
      <Hero />
      <MarqueeStrip />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
