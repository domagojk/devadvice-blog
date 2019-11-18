import React from 'react'
import { Link } from 'gatsby'
import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  console.log(rootPath)
  return (
    <div className="top">
      <div className="link-wrapper">
        <Link className={rootPath === '/' ? 'link active' : 'link'} to={`/`}>
          Blog
        </Link>

        <a className="link" href="https://devadvice.io">
          Consulting
        </a>

        <Link
          className={rootPath === '/about' ? 'link active' : 'link'}
          to={`/about`}
        >
          About
        </Link>
      </div>
    </div>
  )
}
