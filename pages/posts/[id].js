import DateComponent from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

/**
 * @typedef {Object} PostProps
 * @property {import('../../lib/posts').PostData} postData
 */

/**
 * @typedef {Object} PostParams
 * @property {string} id
 */

/** @param {PostProps} props */
export default function Post({ postData }) {
  const { title, date, contentHtml, modifiedDate } = postData
  return (
    <Layout title={title}>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <DateComponent dateString={date} title='Created' />
        </div>
        <div className={utilStyles.lightText}>
          <DateComponent dateString={modifiedDate} title='Modified' />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  )
}

/** @returns {ReturnType<import('next').GetStaticPaths<PostParams>>} */
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

/** @type {import('next').GetStaticProps<PostProps, PostParams>} */
export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
