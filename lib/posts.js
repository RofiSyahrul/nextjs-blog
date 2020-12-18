import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import dayjs from 'dayjs'

const postsDirectory = path.join(process.cwd(), 'posts')

/**
 * @typedef {Object} PostItem
 * @property {string} id
 * @property {string} title
 * @property {string} date
 * @property {string} modifiedDate
 * */

/**
 * @typedef {PostItem & { contentHtml: string }} PostData
 */

/**
 * @param {string} id
 * @returns {Promise<PostData>}
 */
export async function getPostData(id, { withContent = true } = {}) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const stats = fs.statSync(fullPath)
  const date = dayjs(stats.birthtimeMs).format('YYYY-MM-DD')
  const modifiedDate = dayjs(stats.mtimeMs).format('YYYY-MM-DD')
  const fileContents = fs.readFileSync(fullPath, 'utf-8')
  const matterResult = matter(fileContents)
  if (!withContent) return { id, ...matterResult.data, date, modifiedDate }
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  return { id, contentHtml, ...matterResult.data, date, modifiedDate }
}

/** @returns {Promise<PostItem[]>} */
export async function getSortedPostsData() {
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

/**
 * @typedef {Object} PostId
 * @property {{ id: string }} params
 */

/** @returns {PostId[]} */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }))
}
