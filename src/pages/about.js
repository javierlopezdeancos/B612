import "../components/divider/divider.scss"

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout/layout"

const dividerClass = "divider"
const socialLinksClass = "social-links"

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          bio
          socials {
            name
            url
          }
        }
      }
    }
  `)
  const {
    siteMetadata: { bio, socials },
  } = data.site

  return (
    <Layout>
      <p>{bio}</p>
      <div className={socialLinksClass}>
        {socials.map((social) => {
          if (socials.length === 1)
            return <a href={social.url}>{social.name}</a>
          return (
            <div key={social.url}>
              <a href={social.url}>{social.name}</a>
              {socials.lastIndexOf(social) === socials.length - 1 ? null : (
                <div className={dividerClass}></div>
              )}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default About
