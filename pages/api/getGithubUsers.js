import axios from 'axios'

const PER_PAGE = 10

export default async (req, res) => {
  if (req.method === 'POST') {
    const { searchInput } = req.body

    try {
      // This grabs a PER_PAGE amount of users based on the search term...KA
      const {
        data: { items },
      } = await axios.get(`https://api.github.com/search/users?q=${searchInput}&per_page=${PER_PAGE}`, {
        headers: {
          username: process.env.GITHUB_USERNAME,
          Authorization: process.env.GITHUB_KEY,
        },
      })

      // These queries grab more data for each user, to show on the frontend...KA
      // Not sure if there was an easier way to grab data, but this is what I assumed had to be done from the docs...KA
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
