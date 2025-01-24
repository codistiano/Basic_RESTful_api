const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const users = require('./dummy_data.js')

let id = users.length + 1

// Routes

// Random Homepage
app.get('/', (req, res) => {
  res.send('Homepage!');
});

// Get all users
app.get('/users', (req, res) => {
    res.send(users)
})

// Add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    newUser.id = id
    users.push(newUser);
    id++
    res.status(201).send(newUser)
})

// Deleting a user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(user => user.id === parseInt(id));
    console.log(index)
    if (index === -1) {
        res.status(404).send('User not found');
    } else {
        users.splice(index, 1);
        let successMsg = { message: `User with ID ${id} deleted successfully` }
        res.status(200).send(successMsg);
    }
})


// start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});     
