import React from "react"
import Layout from "../components/layout"
const Post = ({ pageContext }) => (
  <Layout>
    <div style={{maxWidth: 800, margin: "auto"}}>

    <h1 dangerouslySetInnerHTML={{__html: pageContext.title}}></h1>
    <p>{pageContext.bookAuthor}</p>
    {console.log(pageContext.title)}
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }}></div>
    </div>

  </Layout>
)
export default Post
