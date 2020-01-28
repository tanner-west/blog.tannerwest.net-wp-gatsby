/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // query content for WordPress posts
  const result = await graphql(`
    query {
      allWordpressWpBooks {
        edges {
          node {
            id
            slug
            title
            content
            acf {
              book_author {
                post_title
              }
            }
          }
        }
      }
    }
  `)

  const postTemplate = path.resolve(`./src/templates/post.js`)
  result.data.allWordpressWpBooks.edges.forEach(edge => {
    createPage({
      // will be the url for the page
      path: `books/${edge.node.slug}`,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
        title: edge.node.title,
        bookAuthor: edge.node.acf.book_author
          ? edge.node.acf.book_author.post_title
          : null,
        content: edge.node.content,
      },
    })
  })
}
