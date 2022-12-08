import "./post.scss"
import "./pre-post.scss"

import Layout from "../components/layout/layout"
import React from "react"
import SocialNetworksShareButtons from "../components/social-networks-share-buttons"

const componentName = "post"
const titleClass = "title"
const prePostName = "pre-post"

export default ({ pageContext: { frontmatter, html, id } }) => {
  return (
    <Layout>
      <h2 className={titleClass}>{frontmatter.title}</h2>
      <div className={prePostName}>
        <time>{new Date(frontmatter.date).toDateString().toUpperCase()}</time>
      </div>
      <div
        className={componentName}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <SocialNetworksShareButtons />
    </Layout>
  )
}
