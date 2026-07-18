import { getProjectsByCategory } from '@/lib/project-loader';
import { SimpleLayout } from '@/components/layout/simple-layout';
import { Hero } from '@/components/portfolio/hero';
import { PortfolioSection } from '@/components/portfolio/portfolio-grid';
import { TaglineStrip } from '@/components/portfolio/tagline-strip';

export default async function Home() {
  const furniture = getProjectsByCategory('furniture');
  const furnitureFeature = [
    { ...furniture[0], imageUrl: '/uploads/blokstoel_7.jpg' },
    { ...furniture[2], imageUrl: '/uploads/bloktafel_1.jpg' },
    {
      id: 'bijzettafel',
      title: 'Bijzettafel',
      category: 'furniture',
      imageUrl: '/uploads/bijzettafel_1.jpg',
    },
  ];

  return (
    <SimpleLayout>
      <Hero />
      <PortfolioSection id='work' title='Furniture' projects={furnitureFeature} compact />
      <TaglineStrip />
    </SimpleLayout>
  );
}
