import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import * as moment from "moment"


const PostsFeed = () => {
  const data = useStaticQuery(graphql`
    query PostsQuery {
      allWordpressPost {
        edges {
          node {
            title
            excerpt
            date
            path
          }
        }
      }
    }
  `)
  return (
    <div className="postsFeed">
      <h2 className="homePageHeading">Posts</h2>
      {data.allWordpressPost.edges.map(edge => {
        return (
          <Link to={`/posts/${edge.node.path}`} style={{textDecoration: "none", color: "white"}}>
            <h3 style={{marginBottom: 0}}>{edge.node.title}</h3>
            <p>{moment(edge.node.date).format("MMM DD, YYYY")}</p>
            <p dangerouslySetInnerHTML={{__html: edge.node.excerpt}}></p>
          </Link>
        )
      })}
    </div>
  )
}

export default PostsFeed
