import {Router} from 'express';
import {getUsers, getUser} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRoutes = Router();

// Get /users => get all users
// GET /users/:id -> get users by id (dynamic id)
// you can have multipel routs with the same endpoint but they have to be different http verb

userRoutes.get('/', getUsers);
userRoutes.get('/:id', authorize, getUser);
userRoutes.post('/', (req, res) => {
    res.send({
        title: "Create a new user",
    })
});
userRoutes.put('/:id', (req, res) => {
    res.send({
        title: "update a user",
    })
});
userRoutes.delete('/:id', (req, res) => {
    res.send({
        title: "Delete user"
    })
});

export default userRoutes;

