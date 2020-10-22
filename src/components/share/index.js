import "./share.scss"

import React from "react"
import { ShareBlockStandard } from "react-custom-share"

const componentName = "share"

const Share = props => {
  return (
    <div className={`${componentName}`}>
      <ShareBlockStandard {...props} />
    </div>
  )
}

export default Share
