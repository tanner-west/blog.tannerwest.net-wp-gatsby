import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import PostsFeed from "../components/postsFeed.js"
import BookShelf from "../components/bookShelf"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="homeGrid">
      <PostsFeed />
      <div></div>
      <BookShelf />
    </div>
  </Layout>
)

export default IndexPage
