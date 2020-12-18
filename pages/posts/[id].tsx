import DateComponent from 'components/date'
import Layout from 'components/layout'
import { getAllPostIds, getPostData, PostData } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import utilStyles from 'styles/utils.module.css'

interface PostProps {
  postData: PostData
}

type PostParams = {
  id: string
}

const Post: React.FC<PostProps> = ({ postData }) => {
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

export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({
  params,
}) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

export default Post
