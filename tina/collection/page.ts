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
    { type: 'image', name: 'aboutImage', label: 'About portrait' },
    { type: 'image', name: 'aboutBadge', label: 'About wooden logo background' },
    { type: 'string', name: 'aboutEnglish', label: 'About — English', ui: { component: 'textarea' } },
    { type: 'string', name: 'aboutDutch', label: 'About — Nederlands', ui: { component: 'textarea' } },
    { type: 'image', name: 'spotlightImage', label: 'Highlighted project / video poster' },
    { type: 'string', name: 'spotlightAlt', label: 'Highlighted image description' },
    { type: 'string', name: 'spotlightVideo', label: 'Highlighted video URL (MP4 or WebM)', description: 'Leave empty to show the image. Video has playback controls.' },
    { type: 'string', name: 'carouselTitle', label: 'Project carousel handwritten text', ui: { component: 'textarea' } },
    { type: 'image', name: 'contactImage', label: 'Contact background photo' },
    { type: 'image', name: 'contactPortrait', label: 'Contact portrait' },
    { type: 'string', name: 'contactText', label: 'Contact invitation', ui: { component: 'textarea' } },
    { type: 'string', name: 'contactLabel', label: 'Contact link text' },
    { type: 'image', name: 'studioImage', label: 'Closing studio photo' },
    { type: 'string', name: 'studioCopy', label: 'Closing studio description', ui: { component: 'textarea' } },
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
