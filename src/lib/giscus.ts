/* eslint-disable node/prefer-global/process */
const GISCUS_REPO_ID: string = process.env.GISCUS_REPO_ID || ''
const GISCUS_CATEGORY_ID: string = process.env.GISCUS_CATEGORY_ID || ''

export const giscus = {
  repo: 'marprezd/marprezd-portfolio' as `${string}/${string}`,
  repoId: GISCUS_REPO_ID,
  category: 'Announcements',
  categoryId: GISCUS_CATEGORY_ID,
}
