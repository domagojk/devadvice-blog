import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'
import { Head } from '../components/head'
import { PostTitle } from '../components/post-title'
import { PostContainer } from '../components/post-container'
import { SponsorButton } from '../components/sponsor-button'
import { Disqus } from '../components/disqus'
import { Utterences } from '../components/utterances'
import * as ScrollManager from '../utils/scroll'

import '../styles/code.scss'

export default ({ data, pageContext, location }) => {
  useEffect(() => {
    ScrollManager.init()
    return () => ScrollManager.destroy()
  }, [])

  const post = data.markdownRemark
  const metaData = data.site.siteMetadata
  const { title, comment, siteUrl, author, sponsor } = metaData
  const { disqusShortName, utterances } = comment

  const fImg = post.frontmatter.featuredImage
  const fStartIndex = post.html.search(
    new RegExp('src="(.*?)' + fImg + '.[a-zA-Z]{2,3}', 'g')
  )
  const fEndIndex = post.html.search(new RegExp(fImg + '.[a-zA-Z]{2,3}', 'g'))

  const featuredImage =
    fStartIndex !== -1 && fEndIndex !== -1
      ? post.html.substring(fStartIndex + 5, fEndIndex + fImg.length + 4)
      : null

  return (
    <Layout location={location} title={title}>
      <Head
        title={post.frontmatter.title}
        description={post.excerpt}
        featuredImage={featuredImage}
      />
      <PostTitle title={post.frontmatter.title} />
      <PostContainer html={post.html} />
      {!!sponsor.buyMeACoffeeId && (
        <SponsorButton sponsorId={sponsor.buyMeACoffeeId} />
      )}
      {!!disqusShortName && (
        <Disqus
          post={post}
          shortName={disqusShortName}
          siteUrl={siteUrl}
          slug={pageContext.slug}
        />
      )}
      {!!utterances && <Utterences repo={utterances} />}
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        comment {
          disqusShortName
          utterances
        }
        sponsor {
          buyMeACoffeeId
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        featuredImage
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
