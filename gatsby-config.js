const siteMetadata = {
  title: `Roma no se conquistó en un story point`,
  description: `The Javier Lopez de Ancos blog.`,
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
    resolve: `gatsby-plugin-google-fonts`,
    options: {
      fonts: [
        `Source Code Pro\:200,400,700,900`,
        `Nunito\:200,400,600,700`,
        `Space Mono\:200,400,700,900`,
      ],
      display: "swap",
    },
  },
]

module.exports = {
  siteMetadata: siteMetadata,
  plugins: plugins,
}
