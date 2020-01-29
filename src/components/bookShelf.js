import React, { useState } from "react"
import { useStaticQuery, graphql, Link, withAssetPrefix } from "gatsby"

const BookShelf = () => {
  const [sortBy, setSortBy] = useState(1)
  const data = useStaticQuery(graphql`
    query BookShelfQuery {
      allWordpressWpBooks {
        edges {
          node {
            id
            path
            title
            excerpt
            book_category
            acf {
              book_author {
                post_title
              }
            }
          }
        }
      }
      allWordpressWpBookCategory(filter: { wordpress_id: {} }) {
        edges {
          node {
            name
            wordpress_id
          }
        }
      }
    }
  `)

  const sortBooks = () => {
    if (sortBy === 1) {
      setSortBy(2)
    } else {
      setSortBy(1)
    }
  }

  const truncateText = text => {
    if (text.length > 130) {
      const shorterText = text.substr(0, 130)
      return shorterText + "...";
    } else {
      return text;
    }
  }
  return (
    <div className="bookShelf">
      <h2 className="homePageHeading">Book Shelf</h2>
      <p>These are a few books I've read. Click on one to see my notes for it.</p>
      <span onClick={() => sortBooks()} style={buttonStyles}>{sortBy === 1? "Sort Z-A":"Sort A-Z"}   </span>
      <p></p>
      {data.allWordpressWpBooks.edges
        .sort((a, b) => {
          console.log(b.node.title.toLowerCase())
          if (sortBy === 1) {
            if (a.node.title.replace('&#8220;', "").toLowerCase() < b.node.title.replace('&#8220;', "").toLowerCase()) {
              return -1
            }
            if (a.node.title.replace('&#8220;', "").toLowerCase() > b.node.title.replace('&#8220;', "").toLowerCase()) {
              return 1
            }
            return 0
          } else {
            if (a.node.title.replace('&#8220;', "").toLowerCase() < b.node.title.replace('&#8220;', "").toLowerCase()) {
              return 1
            }
            if (a.node.title.replace('&#8220;', "").toLowerCase() > b.node.title.replace('&#8220;', "").toLowerCase()) {
              return -1
            }
            return 0
          }
        })

        .map(edge => {
          return (
            <div key={edge.node.id} style={{ marginBottom: 30 }}>
              {console.log(edge.node)}

              <Link style={{color: "white", textDecoration: "none", }} to={`${edge.node.path}`}>
                <h3
                  style={{ marginBottom: 0 }}
                  dangerouslySetInnerHTML={{ __html: edge.node.title }}
                ></h3>
              </Link>
              <h4 style={{ marginBottom: 10, fontFamily: "'Open Sans', sans-serif" }}>
                {edge.node.acf.book_author.post_title}
              </h4>
              <div
                style={{ marginBottom: 10 }}
                dangerouslySetInnerHTML={{
                  __html: truncateText(edge.node.excerpt),
                }}
              ></div>
            </div>
          )
        })}
    </div>
  )
}

export default BookShelf

const buttonStyles = {
  backgroundColor: "#D93B77",
  padding: "10px 15px",
  borderRadius: 20,
  margin: "15px 0",
  userSelect: "none"

}
