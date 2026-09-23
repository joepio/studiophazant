import { SimpleLayout } from '@/components/layout/simple-layout';
import { getPage } from '@/lib/project-loader';
import { AboutPageClient } from './client-page';

export const metadata = { title: { absolute: 'Over Studio Phazant' }, description: 'Maak kennis met Kristian, oprichter en maker achter Studio Phazant. Meubels op maat met hergebruikt en lokaal gewonnen hout.' };
export default function AboutPage() {
  return <SimpleLayout editorial showSalesCta={false}>
    <AboutPageClient data={{page: getPage('about')}} variables={{relativePath: 'about.mdx'}}
      query={'query About($relativePath: String!) { page(relativePath: $relativePath) { aboutImage aboutBadge aboutEnglish aboutDutch } }'} />
  </SimpleLayout>;
}
