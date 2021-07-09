import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import styled from 'styled-components'

import { Image, SearchBar } from '@components'

const Avatar = styled(Image)`
  border-radius: 50%;
  height: 80px;
  margin: auto 15px auto 0;
  object-fit: contain;
  width: 80px;
`

const Content = styled.div`
  border-radius: 20px;
  box-shadow: 0px 0px 15px rgba(89, 114, 215, 0.15);
  display: flex;
  flex-direction: column;
  height: 60%;
  margin: auto;
  padding: 40px;
  max-width: 385px;

  @media (min-width: 768px) {
    width: 500px;
  }
`

const NoUsersText = styled.span`
  color: #8f949c;
  font-size: 16px;
  margin-top: 30px;
  text-align: center;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 10px;
  overflow: auto;
`

const UserTile = styled.div`
  border-bottom: 1px solid #e4e6ed;
  display: flex;
  margin: 20px;
  padding-bottom: 20px;

  &:last-of-type {
    border: none;
  }
`

const Text = styled.span`
  color: #292739;
  font-size: 16px;
  margin-right: 20px;
  margin-top: 5px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding: 40px;

  h1 {
    text-align: center;
  }
`

// Would have loved to infinitely load the list, but due to way we have to grab users from the GitHub api, it would keep hitting the API rate limit...KA
const HomePage = () => {
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  // This is null instead of an empty array so the 'No results' message doesn't flash on initial load...KA
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const getUsers = async () => {
      const {
        data: { success, usersList },
      } = await axios.post('/api/getGithubUsers', { page, searchInput })

      if (success) {
        if (usersList.length === 0) {
          setUsers([])
          return setHasMore(false)
        }
        setUsers(usersList)
      }
    }

    if (searchInput.length > 2) getUsers()
  }, [searchInput])

  const handleChange = e => {
    setSearchInput(e.target.value)
    if (e.target.value.length < 3) setUsers(null)
  }

  const handleClear = () => {
    setSearchInput('')
    setUsers(null)
  }

  return (
    <Wrapper>
      <h1>GitHub User Search</h1>
      <Content>
        <SearchBar autoFocus handleClear={handleClear} onChange={handleChange} placeholder='Search for users...' value={searchInput} />
        {users?.length === 0 && <NoUsersText>No results found! Please try another search.</NoUsersText>}
        {!users && <NoUsersText>Begin your search above!</NoUsersText>}
        <UserList>
          {users?.length > 0 &&
            users.map(({ avatar_url, created_at, email, html_url, location, login, name, public_repos, updated_at }) => (
              <UserTile>
                <Avatar alt={`${name} avatar`} src={avatar_url} />
                <UserInfo>
                  {name && (
                    <Text>
                      {name} (
                      <a href={html_url} target='_blank'>
                        {login}
                      </a>
                      )
                    </Text>
                  )}
                  {email && (
                    <Text>
                      <a href={`mailto:${email}`}>{email}</a>
                    </Text>
                  )}
                  {location && <Text>{location}</Text>}
                  <Text>Repos: {public_repos}</Text>
                  <Text>User Since: {moment(created_at).format('MM/DD/YY')}</Text>
                  <Text>Last Active: {moment(updated_at).format('MM/DD/YY')}</Text>
                </UserInfo>
              </UserTile>
            ))}
        </UserList>
      </Content>
    </Wrapper>
  )
}

export default HomePage
