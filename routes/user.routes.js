import express from 'express';
const router = express();


import data from '../data/index.js';
let users = data
import idGenerator from '../utils/idGenerator.js';

// ADD user
router.post('/users', (req, res) => {
    const { name, age, email } = req.body;

    let error = [];

    if (!name) error.push('Enter name.');
    if (!age) error.push('Enter age.');
    if (!email) error.push('Enter email.');

    if (error.length > 0) return res.status(400).json({ message: error });

    // validate email format: 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Provide valid email format.' });
    }

    const newUser = { id: idGenerator(users), ...req.body };
    users = [...users, newUser];
    res.status(200).json(newUser);
})
router.get('/users', (req, res) => {

    res.status(200).json(users);
})
//  GET user by id
router.get('/users/:id', (req, res) => {
    const { id } = req.params;

    for (let user of users) {
        if (user.id === id) {
            return res.json(user);
        }

    }
    res.send({ message: 'user not found.' });
});

// UPDATE user
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;

    let error = [];

    if (!name) error.push('Enter name.');
    if (!age) error.push('Enter age.');
    if (!email) error.push('Enter email.');

    if (error.length > 0) return res.status(400).json({ message: error });

    // validate email format: 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Provide valid email format.' });
    }


    let foundUser = users.find((user) => user.id === id);

    if (!foundUser) return res.json({ message: 'User not found.' })

    const updatedUser = {
        id,
        name: name || foundUser.name,
        age: age || foundUser.age,
        email: email || foundUser.email

    };
    // find product index
    const index = users.findIndex((user) => user.id === id);
    users[index] = updatedUser;

    res.json(updatedUser);

});

// DELETE USER
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);
    res.json({ message: 'User id no.' + id + ' was successfully removed.' });
})

export default router;