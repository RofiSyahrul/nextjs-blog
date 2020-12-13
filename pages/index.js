import Head from 'next/head'
import Link from 'next/link'
import cn from 'classnames'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import DateComponent from '../components/date'

/**
 * @typedef {Object} HomeProps
 * @property {import('../lib/posts').PostItem[]} allPostsData
 */

/** @returns {Promise<{ props: HomeProps }>} */
export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

/** @param {HomeProps} props */
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I am Syahrul Rofi. You can call me Rofi. I am a frontend engineer
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={cn(utilStyles.headingMd, utilStyles.padding1px)}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title, date }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
