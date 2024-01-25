import { useEffect, useState } from "react"
import axiosClient from "../axios-client";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/auth/users')
      .then(({data}) =>{
        setLoading(false)
        console.log(data);
      })
      .catch(() =>{
       
      })
  }

  return (
    <div>
      Users
    </div>
  )
}
