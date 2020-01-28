import React, {useState} from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const BookShelf = () => {
  const [sortBy, setSortBy] = useState(1);  
  const data = useStaticQuery(graphql`
    query BookShelfQuery {
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
      if(sortBy === 1){
          setSortBy(2)
      } else {
          setSortBy(1)
      }
  }
  return (
    <div className="bookShelf">
      <h2 className="homePageHeading">Book Shelf</h2>
      <p onClick={() => sortBooks()}>sort</p>
      {data.allWordpressWpBooks.edges
      .sort((a, b) => {

        if(sortBy === 1){
            if (a.node.title.toLowerCase() < b.node.title.toLowerCase()) {
                return -1;
              }
              if (a.node.title.toLowerCase() > b.node.title.toLowerCase()) {
                return 1;
              }
              return 0;
        } else {
            if (a.node.title.toLowerCase() < b.node.title.toLowerCase()) {
                return 1;
              }
              if (a.node.title.toLowerCase() > b.node.title.toLowerCase()) {
                return -1;
              }
              return 0;
        }



      })
      
      .map(edge => {
        return (
        <div style={{marginBottom: 30}}>
        <Link to={`/${edge.node.path}`}><h4 style={{marginBottom: 10}} dangerouslySetInnerHTML={{__html: edge.node.title}}></h4></Link>
        <p style={{margin: 0}}>{edge.node.acf.book_author.post_title}</p>
        </div>)
      })}
    </div>
  )
}

export default BookShelf
