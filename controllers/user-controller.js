
import data from '../data/index.js';
import idGenerator from '../utils/idGenerator.js';

let users = data;

// USER ROUTE Controllers 

const addUser = (req, res) => {
    const { fullName, age, email } = req.body;

    let error = [];
    const splittedName = fullName.split(' ');
    if (splittedName.length < 2 || splittedName[1] === '') error.push('Enter full name.');
    if (!age) error.push('Enter age.');
    if (!email) error.push('Enter email.');

    if (error.length > 0) return res.status(400).json({ message: error });

    // validate email format: 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Provide valid email format.' });
    }
    const foundUser = users.find((user) => user.email === email);
    console.log('is user found:', foundUser)
    if (foundUser) return res.status(400).json({ message: 'Email already exists.' });

    const newUser = { id: idGenerator(users), ...req.body };
    users = [...users, newUser];
    res.status(200).json(newUser);
}

const getUsers = (req, res) => {
    res.json(users);
}

const getUser = (req, res) => {
    const { id } = req.params;

    for (let user of users) {
        if (user.id === id) {
            return res.json(user);
        }

    }
    res.status(404).json({ message: `User with id of ${id} was not found.` });
}
const updateUser = (req, res) => {
    const { id } = req.params;
    const { fullName, age, email } = req.body;

    let error = [];
    const splittedName = fullName.split(' ');
    if (splittedName.length < 2 || splittedName[1] === '') error.push('Enter full name.');
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
        fullName: fullName || foundUser.fullName,
        age: age || foundUser.age,
        email: email || foundUser.email

    };
    // find product index
    const index = users.findIndex((user) => user.id === id);
    users[index] = updatedUser;

    res.json(updatedUser);

}

const deleteUser = (req, res) => {
    const { id } = req.params;

    // Ensure user exist:
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
        return res.status(404).json({ message: `User with id of ${id} was not found.` })
    }
    users = users.filter((user) => user.id !== id);
    res.json({ message: `User was successfully removed.` });
}

export default {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser

}