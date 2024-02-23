import express from 'express';
const router = express();


import data from '../data/index.js';
let users = data

import idGenerator from '../utils/idGenerator.js';
import userController from '../controllers/user-controller.js';

// ADD user
router.post('/users', userController.addUser);

// GET all users
router.get('/users', userController.getUsers);

//  GET user by id
router.get('/users/:id', userController.getUser);

// UPDATE user
router.put('/users/:id', userController.updateUser)

// DELETE USER
router.delete('/users/:id', userController.deleteUser);


export default router;