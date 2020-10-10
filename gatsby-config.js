const siteMetadata = {
  title: `Roma no se conquistó en un story point`,
  description: `.`,
  author: `javierlopezdeancos.dev`,
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
  `gatsby-plugin-react-helmet`,
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
  `gatsby-transformer-sharp`,
  `gatsby-transformer-remark`,
  `gatsby-plugin-sharp`,
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
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      // The property ID; the tracking code won't be generated without it
      trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
      // Defines where to place the tracking script - `true` in the head and `false` in the body
      head: false,
      // Setting this parameter is optional
      anonymize: true,
      // Setting this parameter is also optional
      respectDNT: true,
      // Avoids sending pageview hits from custom paths
      exclude: ["/preview/**", "/do-not-track/me/too/"],
      // Delays sending pageview hits on route update (in milliseconds)
      pageTransitionDelay: 0,
      // Enables Google Optimize using your container Id
      optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
      // Enables Google Optimize Experiment ID
      experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
      // Set Variation ID. 0 for original 1,2,3....
      variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
      // Any additional optional fields
      sampleRate: 5,
      siteSpeedSampleRate: 10,
      cookieDomain: "example.com",
    },
  },
  `gatsby-plugin-sass`,
  `gatsby-plugin-offline`,
  {
    resolve: `gatsby-plugin-prefetch-google-fonts`,
    options: {
      fonts: [
        {
          family: `Source Code Pro`,
          variants: [`200`, `400`, `700`, `900`],
        },
        {
          family: `Droid Sans`,
          variants: [`200`, `400`, `700`],
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
