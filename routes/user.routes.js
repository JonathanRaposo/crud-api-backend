import express from 'express';
const router = express();


import data from '../data/index.js';
let users = data

import idGenerator from '../utils/idGenerator.js';
import user_controller from '../controllers/user-controller.js';

// ADD user
router.post('/users', user_controller.AddUser);

// GET all users
router.get('/users', user_controller.getUsers);

//  GET user by id
router.get('/users/:id', user_controller.getUser);

// UPDATE user
router.put('/users/:id', user_controller.updateUser)

// DELETE USER
router.delete('/users/:id', user_controller.DeleteUser);


export default router;