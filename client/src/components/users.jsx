import { useEffect } from "react";
import { useUsersActions } from '../usersstore'
import { useUsers } from '../usersstore'
import { Routes, Route, Link } from "react-router-dom";

const Users = () => {
  const { initializeUsers } = useUsersActions()
  const theUsers = useUsers()
  useEffect(() => {
    initializeUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1 style={{ fontWeight: 400 }}>Users</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%', }}>
        <thead style={{
          borderBottom: '1px solid grey'
        }}>
          <tr>
            <th style={{ padding: '20px 0' }}>Name</th>
            <th style={{ padding: '20px 0' }}>Username</th>
            <th style={{ padding: '20px 0' }}>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            theUsers.map(user => {
              return (
                <tr key={user.id} style={{
                  borderBottom: '1px solid grey'
                }}>
                  <th style={{ padding: '20px 0', fontWeight: 200 }}><Link to={`/users/${user.id}`}>{user.name}</Link></th>
                  <th style={{ padding: '20px 0', fontWeight: 200 }}>{user.username}</th>
                  <th style={{ padding: '20px 0', fontWeight: 200 }}>{user.blogs.length}</th>
                </tr>
              )

            })
          }
        </tbody>
      </table>
    </div >
  )
}

export default Users