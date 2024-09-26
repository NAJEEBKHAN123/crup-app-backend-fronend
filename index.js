const express = require('express')

const PORT = 3000;
const app = express();

const users = [
    {id: 1, name: 'najeeb', email: 'najeebkhan@gmail.com'},
    {id: 2, name: 'ali', email: 'alikhan@gmail.com'}

]
app.get('/api/user', (req, res) =>{
    res.status(200).json({ message: 'Fetched all users!', data: users })
})

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})