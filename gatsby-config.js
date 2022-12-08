const siteMetadata = {
  title: `Roma no se conquistó en un story point`,
  description: `.`,
  author: `blog.javierlopezdeancos.dev`,
  bio: "Im Javier López de Ancos and I'm Software Engineer",
  socials: [
    {
      name: "Github",
      url: "https://github.com/javierlopezdeancos",
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/javierlopezdeancos/",
    },
  ],
}

const plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdowns`,
      path: `${__dirname}/src/posts`,
    },
  },
  `gatsby-transformer-remark`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `gatsby-starter-simple`,
      short_name: `simple`,
      start_url: `/`,
      background_color: `#fff`,
      theme_color: `#333`,
      display: `minimal-ui`,
      icon: `src/images/simple-icon.png`, // This path is relative to the root of the site.
    },
  },
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /assets/,
      },
    },
  },
  `gatsby-plugin-sass`,
  {
    resolve: `@el7cosmos/gatsby-plugin-prefetch-google-fonts`,
    options: {
      fonts: [
        {
          family: `Source Code Pro`,
          variants: [`200`, `400`, `700`, `900`],
        },
        {
          family: `Nunito`,
          variants: [`200`, `400`, `600`, `700`],
        },
        {
          family: `Space Mono`,
          variants: [`200`, `400`, `700`, `900`],
        },
      ],
    },
  },
]

module.exports = {
  siteMetadata: siteMetadata,
  pathPrefix: "/gatsby-starter-simple", // REMOVE IF NOT DEPLOYING TO GH-PAGES
  plugins: plugins,
}
