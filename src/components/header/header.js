import "./header.scss"

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const componentName = "header"

const Header = ({ siteTitle }) => (
  <header className={`${componentName}`}>
    <a href="https://javierlopezdeancos.dev">
      <img
        className={`${componentName}-image`}
        alt="Javier López de Ancos"
        src="https://javierlopezdeancos.dev/src/images/me.png"
      />
    </a>
    <h1 className={`${componentName}-title`}>
      <Link to="/">{siteTitle}</Link>
    </h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
