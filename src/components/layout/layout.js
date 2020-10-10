import "./layout.scss"

import { graphql, useStaticQuery } from "gatsby"

import Header from "../header/header"
import PropTypes from "prop-types"
import React from "react"

const componentName = "app"

const Layout = ({ children, headless }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <main className={`${componentName}`}>
      {headless ? null : <Header siteTitle={data.site.siteMetadata.title} />}
      <div className={`${componentName}-body-wrapper`}>
        <section className={`${componentName}-body`}>
          <article className={`${componentName}-posts`}>{children}</article>
        </section>
      </div>
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
