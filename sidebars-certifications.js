// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  certifications: [
    // Tutorial Link from Certs
    {
      type: "link",
      label: "Tutorials",
      href: "/tutorials",
    },
    // Docs Link from Certs
    {
      type: "link",
      label: "Documentation",
      href: "/docs",
    },
    // Certifications Parent
    {
      type: "category",
      label: "Certifications",
      link: {
        type: "doc",
        id: "all-certifications",
        //type: 'generated-index',
      },
      collapsed: false,
      items: [
        // CD
        {
          type: "doc",
          label: "Continuous Delivery & GitOps",
          id: "continuous-delivery",
        },
        // CI
        {
          type: "doc",
          label: "Continuous Integration",
          id: "continuous-integration",
        },
        //CCM
        {
          type: "doc",
          label: "Cloud Cost Management",
          id: "cloud-cost-management",
        },
        //ff
        {
          type: "doc",
          label: "Feature Flags",
          id: "feature-flags",
        },
        //ce
        {
          type: "doc",
          label: "Chaos Engineering",
          id: "chaos-engineering",
        },
        // Instructions
        {
          type: "doc",
          label: "Instructions",
          id: "instructions",
        },
        // FAQs
        {
          type: "doc",
          label: "FAQs",
          id: "faqs",
        },
      ],
    },
    // KB Link from Certs
    {
      type: "link",
      label: "Knowledge Base",
      href: "/kb",
    },
    // Community Link from Certs
    {
      type: "link",
      label: "Community",
      href: "/community",
    },
  ],
};

module.exports = sidebars;

/*
//Create with Children
  {
          type: "category",
          label: "Instructions",
          link: {
            type: "doc",
            id: "instructions",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "certification-instructions" }],
        },

*/
