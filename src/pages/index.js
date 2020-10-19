import "./posts.scss"

import { BlogLink, BlogTitle, PrePost } from "../styled-components/index"

import Layout from "../components/layout/layout"
import React from "react"
import SEO from "../components/seo/seo"
import { graphql } from "gatsby"

const componentName = "posts"

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id} className={componentName}>
        <BlogLink to={node.fields.slug}>
          <BlogTitle>{node.frontmatter.title}</BlogTitle>
        </BlogLink>
        <PrePost>
          <span>
            {new Date(node.frontmatter.date).toDateString().toUpperCase()}
          </span>
          <span>{node.timeToRead} MIN READ</span>
        </PrePost>
        {node.excerpt && (
          <p className={`${componentName}-post-content`}>{node.excerpt}</p>
        )}
      </div>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          timeToRead
          frontmatter {
            date
            title
            description
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`
