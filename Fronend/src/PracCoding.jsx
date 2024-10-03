
import axios from "axios"
import { useEffect, useState } from "react";



const apiUrl = 'http://localhost:3000/api/user'

function PracCoding() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('')
    const [updateUser, setUpdateUser] = useState({name: '', id:''})

    const fetchUsers = async() =>{
       try {
        const response = await axios.get(apiUrl)
        const content = response.data
        const contentData = content.data;
        setUsers(contentData)
        console.log(contentData)
       } catch (error) {
        console.log(error)
       }
    }

    useEffect(() =>{
        fetchUsers()
    },[])

    const addUser = async() =>{
        try {
        const response = await axios.post(apiUrl, {name: newUser});
        setUsers([...users, response.data])
        setNewUser('')
        fetchUsers();
        } catch (error) {
            console.log(error)
        }
    }

    const updateUserById = async(id) =>{
     try {
        const response = await axios.put(`${apiUrl}/${id}`, {name: updateUser.name})
        users.map((user) => user.id === id ? response.data : user)
        setNewUser({id: '', name: ''})  
        fetchUsers();
     } catch (error) {
        console.log(error)
     }
    }

    const deleteUserById = async(id) =>{
        try {
            const response = await axios.delete(`${apiUrl}/${id}`)
            setUsers(users.filter(user => user.id !== id));
            console.log("User deleted successfully:", response);
        } catch (error) {
            console.log(error)
        }
       
        
    }
  return (
    <div>
      <h1>this is my practice</h1>
      <input type="text" placeholder="enter user" value={newUser} onChange={(e) => setNewUser(e.target.value)}/>
      <button onClick={addUser}>adduser</button>
     {updateUser.id && (
            <div>
            <input
              type="text"
              value={updateUser.name}
              onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
              placeholder="Update user name"
            />
            <button onClick={() => updateUserById(updateUser.id)}>Update User</button>
          </div>
        )}
       {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => setUpdateUser({ id: user.id, name: user.name })}>
              Edit
            </button>
            <button onClick={() => deleteUserById(user.id)}>Delete</button>
          </li>
        ))}
    </div>
  )
}

export default PracCoding
