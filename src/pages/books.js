import React, {useState} from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from "gatsby"
import { useTrail, animated } from 'react-spring'


import "./books.css"



const BooksPage = () => {
  const data = useStaticQuery(graphql`
    query BookQuery {
      allWordpressWpBooks {
        edges {
          node {
            id
            path
            title
            book_category
            acf {
              book_author {
                post_title
              }
            }
          }
        }
      }
      allWordpressWpBookCategory(filter: {wordpress_id: {}}) {
        edges {
          node {
            name
            wordpress_id
          }
        }
      }
    }
  `)
  const getBookCategories = (bookCategoryIds) => {
    const categories = data.allWordpressWpBookCategory.edges.filter(edge => {
        return bookCategoryIds.includes(edge.node.wordpress_id)
    })
    return categories;
  }

  const replaceSpacesWithDashes = (string) => {
    return string.replace(/\s+/g, "-").toLowerCase();
  }

 

  const elements = data.allWordpressWpBooks.edges
  .sort(function(a, b){
      if(a.node.title < b.node.title) { return -1; }
      if(a.node.title > b.node.title) { return 1; }
      return 0;
  }).
  map(page => (
    <div key={page.node.id} style={linkStyles} to={`${page.node.path}`}>
      <div style={bookStyles} >
        <h2 style={titleStyles}>{page.node.title}</h2>
        <h3 style={authorStyles}>
          {page.node.acf.book_author
            ? page.node.acf.book_author.post_title
            : null}
        </h3>
        {getBookCategories(page.node.book_category).map(category => {
            return (<span className={`${replaceSpacesWithDashes(category.node.name)}-book-category-tag`} style={categoryTagStyles} key={category.node.wordpress_id}>{category.node.name}</span>)
          })}
      </div>
    </div>
  ))

  const config = { mass: 5, tension: 2000, friction: 200 };

  const [toggle, set] = useState(true)
  const trail = useTrail(elements.length, {
    config,
    opacity: toggle ? 1 : 1,
    x: toggle ? 0 : 20,
    height: toggle ? 130 : 0,
    from: { opacity: 1, x: 20, height: 130 },
  })
  return (
    <Layout>
      {/* <h1>Books</h1> */}
      <div style={bookGridStyles} onClick={() => set(state => !state)}>
      {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={elements[index]}
            className="trails-text"
            // style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}
            style={{...rest}}
            >
            <animated.div style={{ height }}>{elements[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </Layout>
  )
}
export default BooksPage

const bookGridStyles = {
  //   display: "grid",
  //   gridTemplateColumns: "25% 25% 25% 25%",
  //   gridTemplateRows: "repeat(300px)",
}

const bookStyles = {
  padding: "15px",
  borderBottom: "1px solid #383838",
}

const titleStyles = {
  color: "#383838",
  textDecoration: "none",
  fontFamily: "'Archivo Black', sans-serif",
  margin: "0 0 5px 0"
}

const authorStyles = {
  color: "#383838",
  textDecoration: "none",
  fontFamily: "'Archivo', sans-serif",
  margin: 0,
  margin: "0 0 15px 0",
  fontWeight: "normal"

}

const linkStyles = {
    textDecoration: "none"
}

const categoryTagStyles = {
    textDecoration: "none",
    margin: "5px 5px 0 0",
    padding: "10px 15px",
    fontFamily: "'Archivo', sans-serif",
    color: "white",
    borderRadius: "20px",
    fontSize: "14px"

}