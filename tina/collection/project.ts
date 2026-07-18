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
      type: "image",
      name: "gallery",
      label: "Project photos",
      list: true,
    },
    {
      type: "string",
      name: "color",
      label: "Overlay Color",
      options: [
        { value: "#56894f", label: "Green" },
        { value: "#bedfe3", label: "Blue" },
        { value: "#ffdd82", label: "Yellow" },
        { value: "#d89557", label: "Terracotta" },
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
