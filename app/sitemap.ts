import type { MetadataRoute } from 'next';
import { getProjectFiles } from '@/lib/project-loader';
import { getProjectUrl } from '@/lib/project-urls';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studiophazant.nl';
  const paths = [
    '/',
    '/about',
    '/work',
    ...getProjectFiles().map(file => getProjectUrl(file.replace(/\.mdx$/, ''))),
  ];

  return paths.map(path => ({ url: `${baseUrl}${path}` }));
}
