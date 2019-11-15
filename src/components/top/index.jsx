import React from 'react'
import { Link } from 'gatsby'
import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  return (
    <div className="top">
      <Link to={`/`} className="link">
        {title}
      </Link>
    </div>
  )
}
