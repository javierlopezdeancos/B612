import React from "react"
import { getImage } from "gatsby-plugin-image"

const Image = ({ data, alt }) => {
  const image = getImage(data.file)
  return <GatsbyImage image={image} alt={alt} />
}
