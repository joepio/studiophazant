import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { featureBlockSchema } from '@/components/blocks/features';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { statsBlockSchema } from '@/components/blocks/stats';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') {
        return '/';
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: 'image',
      name: 'heroImage',
      label: 'Homepage hero image',
    },
    {
      type: 'image',
      name: 'featuredImages',
      label: 'Featured furniture images',
      list: true,
    },
    {
      type: 'image',
      name: 'taglineImages',
      label: 'Studio section images',
      list: true,
    },
    {
      type: 'string',
      name: 'taglineTitle',
      label: 'Studio section title',
      ui: { component: 'textarea' },
    },
    {
      type: 'string',
      name: 'taglineFirst',
      label: 'Studio section first paragraph',
      ui: { component: 'textarea' },
    },
    {
      type: 'string',
      name: 'taglineSecond',
      label: 'Studio section second paragraph',
      ui: { component: 'textarea' },
    },
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
      ],
    },
  ],
};

export default Page;
