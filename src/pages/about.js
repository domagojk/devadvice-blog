import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { rhythm } from '../utils/typography'
import { Top } from '../components/top'

export default ({ data }) => {
  const [email, setEmail] = useState('Email')
  const pages = data.allMarkdownRemark.edges
  const page = pages[0].node

  return (
    <div>
      <Top rootPath={'/about'} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(28),
          padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4
          )}`,
        }}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
      <div style={{ textAlign: 'center' }}>
        <a href="https://github.com/domagojk" target="_blank">
          Github
        </a>
        {' - '}
        <a
          href="https://www.linkedin.com/in/domagoj-k-b08a31148/"
          target="_blank"
        >
          LinkedIn
        </a>
        {' - '}{' '}
        <span
          className="link"
          onClick={() => {
            setEmail('domagoj.kriskovic@gmail.com')
          }}
        >
          {email}
        </span>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "about" } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
