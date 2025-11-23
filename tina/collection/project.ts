import type { Collection } from "tinacms";

const Project: Collection = {
  name: "project",
  label: "Projects",
  path: "content/projects",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/projects/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "category",
      label: "Category",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "image",
      name: "imageUrl",
      label: "Image",
      required: true,
    },
    {
      type: "string",
      name: "color",
      label: "Overlay Color",
      options: [
        { value: "bg-primary", label: "Primary" },
        { value: "bg-secondary", label: "Secondary" },
        { value: "bg-accent", label: "Accent" },
        { value: "bg-muted", label: "Muted" },
        { value: "bg-destructive", label: "Destructive" },
        { value: "bg-chart-2", label: "Chart 2" },
        { value: "bg-chart-3", label: "Chart 3" },
      ],
    },
    {
      type: "string",
      name: "span",
      label: "Grid Span",
      options: [
        { value: "col-span-1", label: "Single Column" },
        { value: "col-span-1 md:col-span-2", label: "Double Column (Desktop)" },
      ],
    },
    {
      type: "boolean",
      name: "featured",
      label: "Featured",
      description: "Show this project prominently",
    },
  ],
};

export default Project;
