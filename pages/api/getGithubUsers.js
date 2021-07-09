import axios from 'axios'

const PER_PAGE = 10

export default async (req, res) => {
  if (req.method === 'POST') {
    const { searchInput } = req.body
    try {
      const {
        data: { items },
      } = await axios.get(`https://api.github.com/search/users?q=${searchInput}&per_page=${PER_PAGE}`, {
        headers: {
          username: process.env.GITHUB_USERNAME,
          Authorization: process.env.GITHUB_KEY,
        },
      })

      let userQueries = items.map(i =>
        axios.get(i.url, {
          headers: {
            username: process.env.GITHUB_USERNAME,
            Authorization: process.env.GITHUB_KEY,
          },
        })
      )

      const users = await Promise.all(userQueries)

      res.json({ success: true, usersList: users.map(u => u.data) })
    } catch (e) {
      console.error('Error getting github users: ', e)
      res.json({ success: false })
    }
  }
}
