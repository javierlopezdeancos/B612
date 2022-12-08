import "./posts.scss"
import "../templates/pre-post.scss"
import "../components/link/link.scss"

import Layout from "../components/layout/layout"
import React from "react"
import { graphql, Link } from "gatsby"

const componentName = "posts"
const linkClass = "link"
const titleClass = "title"
const prePostClass = "pre-post"

export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id} className={componentName}>
        <Link className={linkClass} to={node.fields.slug}>
          <h3 className={titleClass}>{node.frontmatter.title}</h3>
        </Link>
        <div className={prePostClass}>
          <span>
            {new Date(node.frontmatter.date).toDateString().toUpperCase()}
          </span>
          <span>{node.timeToRead} MIN READ</span>
        </div>
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
