const express = require('express')

const PORT = 3000;
const app = express();

app.get('/', (req, res) =>{
    res.send("hi this is home page")
})

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})