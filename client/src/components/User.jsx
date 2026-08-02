import { useParams } from "react-router";
import { useUsers } from '../usersstore'
import { useUsersActions } from '../usersstore'
import { useEffect } from 'react'

const User = () => {
  const id = useParams().id
  const users = useUsers()
  const user = users.find(u => u.id === id)
  const { initializeUsers } = useUsersActions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { initializeUsers() }, [])
  if (!user) return <div>loading...</div>
  const blogs = user.blogs
  return (
    <div>
      <h1 style={{ fontWeight: 'normal' }}>{user.name}</h1>
      <h2 style={{ fontWeight: 'normal' }}>Added blogs</h2>
      {
        blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
      }
    </div>
  )

}
export default User