import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (u) => {
    if(!window.confirm("Are you sure you want to delete this user?")) {
      return
    }

    //removing the deleted user from the list
    axiosClient.delete(`/auth/users/${u.id}`)
    .then(() => {
      setNotification("User was successfully created")
      getUsers()
    })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/auth/users')
      .then(({data}) =>{
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() =>{
       setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Users</h1>
        <Link to="/auth/users/new" className="btn-add">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Account Type</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && 
          <tbody>
            <tr>
              <td colSpan="7" className="text-center">
                loading...
              </td>
            </tr>
          </tbody>
          }

          {!loading &&
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.account_type}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/auth/users/'+u.id}>Edit</Link>
                  &nbsp;
                  <button onClick={ev => onDelete(u)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          }
        </table>
      </div>
    </div>
  )
}