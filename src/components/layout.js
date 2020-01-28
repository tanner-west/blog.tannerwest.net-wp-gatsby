/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // const pages = useStaticQuery(graphql`
  // query PageQuery {
  //   allSitePage {
  //     edges {
  //       node {
  //         id
  //         path
  //       }
  //     }
  //   }
  // }
  // `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          padding: `15px`,
          maxWidth: 1500,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
          margin: "auto"
        }}
      >
        <link
          href="https://fonts.googleapis.com/css?family=Archivo+Black|Open+Sans&display=swap"
          rel="stylesheet"
        ></link>
        <main>{children}</main>
        <footer>
          {/* © {new Date().getFullYear()}, Built with
          <a href="https://www.gatsbyjs.org">Gatsby</a> */}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
