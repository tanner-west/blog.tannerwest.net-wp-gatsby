import React from "react"
import Layout from "../components/layout"
const Post = ({ pageContext }) => (
  <Layout>
    <h1>{pageContext.title}</h1>
    <h2>{pageContext.bookAuthor}</h2>
    {console.log(pageContext.title)}
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }}></div>
  </Layout>
)
export default Post
