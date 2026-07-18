import { getProjectsByCategory } from '@/lib/project-loader';
import { getPage } from '@/lib/project-loader';
import { SimpleLayout } from '@/components/layout/simple-layout';
import { HomePageClient } from '@/components/portfolio/home-page-client';

export default async function Home() {
  const furniture = getProjectsByCategory('furniture');
  const home = getPage('home');
  const query = `
    query HomePage($relativePath: String!) {
      page(relativePath: $relativePath) {
        heroImage
        featuredImages
        taglineImages
        taglineTitle
        taglineFirst
        taglineSecond
      }
    }
  `;

  return (
    <SimpleLayout>
      <HomePageClient
        data={{ page: home }}
        query={query}
        variables={{ relativePath: 'home.mdx' }}
        furniture={furniture}
      />
    </SimpleLayout>
  );
}
