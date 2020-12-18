import Link from 'next/link'
import cn from 'classnames'
import Layout from 'components/layout'
import utilStyles from 'styles/utils.module.css'
import { getSortedPostsData, PostItem } from 'lib/posts'
import DateComponent from 'components/date'

interface HomeProps {
  allPostsData: PostItem[]
}

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I am Syahrul Rofi. You can call me Rofi. I am a frontend engineer.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={cn(utilStyles.headingMd, utilStyles.padding1px)}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title, date, modifiedDate }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent dateString={date} title='Created' />
              </small>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent dateString={modifiedDate} title='Modified' />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
