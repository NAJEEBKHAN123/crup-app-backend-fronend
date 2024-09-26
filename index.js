const express = require('express')

const PORT = 3000;
const app = express();
app.use(express.json())

const users = [
    {id: 1, name: 'najeeb', email: 'najeebkhan@gmail.com'},
    {id: 2, name: 'ali', email: 'alikhan@gmail.com'}

]
// GET request  

app.get('/api/user', (req, res) =>{
    res.status(200).json({ message: 'Fetched all users!', data: users })
})

// POST Requst  create new user 

app.post('/api/user', (req, res) =>{
    const user = req.body;
    const newuser = {
        id: users.length + 1,
        ...user
    }
    users.push(newuser)
    res.status(201).json({ message: 'new User created!', data: newuser })
})


app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})