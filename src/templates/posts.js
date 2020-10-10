import "./post.scss"

import { MainBlogTitle, PrePost } from "../styled-components/index"

import Layout from "../components/layout/layout"
import React from "react"
import SEO from "../components/seo/seo"

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
    </Layout>
  )
}
