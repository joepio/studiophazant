import { getAllProjects } from '@/lib/project-loader';
import { getPage } from '@/lib/project-loader';
import { SimpleLayout } from '@/components/layout/simple-layout';
import { HomePageClient } from '@/components/portfolio/home-page-client';

export default async function Home() {
  const projects = getAllProjects();
  const furniture = projects.filter((project) => project.category === 'furniture');
  const home = getPage('home') as { carouselItems?: { image?: string; alt?: string; project?: string }[] };
  const pageData = {
    ...home,
    carouselItems: home.carouselItems?.map((item) => {
      const project = projects.find((project) => `content/projects/${project.id}.mdx` === item.project);
      return { ...item, project: project ? { title: project.title, _sys: { filename: project.id } } : null };
    }),
  };
  const query = `
    query HomePage($relativePath: String!) {
      page(relativePath: $relativePath) {
        heroImage
        featuredImages
        carouselItems { image alt project { ... on Project { title _sys { filename } } } }
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
        data={{ page: pageData }}
        query={query}
        variables={{ relativePath: 'home.mdx' }}
        furniture={furniture}
        projects={projects}
      />
    </SimpleLayout>
  );
}
