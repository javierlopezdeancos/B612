import "./social-networks-share-buttons.scss"

import React from "react"

import LinkedinIcon from "../icons/linkedin"
import TwitterIcon from "../icons/twitter"

import { TwitterShareButton, LinkedinShareButton } from "next-share"

const componentClass = "social-networks-share-buttons"

const SocialNetworksShareButtons = (props) => {
  return (
    <div className={`${componentClass}`}>
      <TwitterShareButton
        url={typeof window !== "undefined" ? window.location.href : ""}
        quote={"via: Roma no se conquisto en un story point"}
      >
        <TwitterIcon />
      </TwitterShareButton>
      <LinkedinShareButton
        url={typeof window !== "undefined" ? window.location.href : ""}
      >
        <LinkedinIcon />
      </LinkedinShareButton>
    </div>
  )
}

export default SocialNetworksShareButtons
