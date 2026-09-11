import { getAllProjects } from '@/lib/project-loader';
import { getPage } from '@/lib/project-loader';
import { SimpleLayout } from '@/components/layout/simple-layout';
import { HomePageClient } from '@/components/portfolio/home-page-client';

export default async function Home() {
  const projects = getAllProjects();
  const furniture = projects.filter((project) => project.category === 'furniture');
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
        spotlightImage
        spotlightAlt
        spotlightVideo
        carouselTitle
        contactImage
        contactPortrait
        contactText
        contactLabel
        studioImage
        studioCopy
      }
    }
  `;

  return (
    <SimpleLayout showSalesCta={false}>
      <HomePageClient
        data={{ page: home }}
        query={query}
        variables={{ relativePath: 'home.mdx' }}
        furniture={furniture}
        projects={projects}
      />
    </SimpleLayout>
  );
}
