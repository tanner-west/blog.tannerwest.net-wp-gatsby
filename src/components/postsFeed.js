import React from "react"
import { useStaticQuery, graphql } from "gatsby"
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
          <div>
            <h3>{edge.node.title}</h3>
            <p>{moment(edge.node.date).format("MMM DD, YYYY")}</p>
            <p dangerouslySetInnerHTML={{__html: edge.node.excerpt}}></p>
          </div>
        )
      })}
    </div>
  )
}

export default PostsFeed
