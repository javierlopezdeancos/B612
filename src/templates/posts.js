import "./post.scss"

import { MainBlogTitle, PrePost } from "../styled-components/index"

import Layout from "../components/layout/layout"
import LinkedinIcon from "../components/icons/linkedin"
import React from "react"
import SEO from "../components/seo/seo"
import Share from "../components/share"
import { ShareButtonIconOnly } from "react-custom-share"
import TwitterIcon from "../components/icons/twitter"

const componentName = "post"

export default ({ pageContext: { frontmatter, html, id } }) => {
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <MainBlogTitle>{frontmatter.title}</MainBlogTitle>
      <PrePost>
        <time>{new Date(frontmatter.date).toDateString().toUpperCase()}</time>
      </PrePost>
      <div
        className={componentName}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Share
        url={window.location.href}
        button={ShareButtonIconOnly}
        buttons={[
          { network: "Twitter", icon: TwitterIcon },
          { network: "Linkedin", icon: LinkedinIcon },
        ]}
      />
    </Layout>
  )
}
