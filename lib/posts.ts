import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import dayjs from 'dayjs'

const postsDirectory = path.join(process.cwd(), 'posts')

interface MatterResultData {
  title: string
}

export interface PostItem extends MatterResultData {
  id: string
  date: string
  modifiedDate: string
}

export interface PostData extends PostItem {
  contentHtml?: string
}

export async function getPostData(
  id: string,
  { withContent = true } = {}
): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const stats = fs.statSync(fullPath)
  const date = dayjs(stats.birthtimeMs).format('YYYY-MM-DD')
  const modifiedDate = dayjs(stats.mtimeMs).format('YYYY-MM-DD')
  const fileContents = fs.readFileSync(fullPath, 'utf-8')
  const matterResult = matter(fileContents)
  const data = matterResult.data as MatterResultData
  if (!withContent) return { id, ...data, date, modifiedDate }
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  return { id, contentHtml, ...data, date, modifiedDate }
}

export async function getSortedPostsData(): Promise<PostItem[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      return getPostData(id, { withContent: false })
    })
  )
  return allPostsData.sort((a, b) => {
    if (a.modifiedDate < b.modifiedDate) {
      return 1
    }
    return -1
  })
}

interface PostId {
  params: { id: string }
}

export function getAllPostIds(): PostId[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }))
}
