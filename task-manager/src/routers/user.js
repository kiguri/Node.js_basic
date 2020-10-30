const express= require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

//API create user (sign-up)
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

//API Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

//API Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = user.tokens.filter(token => token.token !== req.token);
        await user.save();

        res.send('Logged out');
    } catch (e) {
        res.status(500).send();
    }
});

//API Logout  ALL
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = [];
        await  user.save();
        res.status(200).send('Logged out all');
    } catch (e) {
        res.status(500).send();
    }
})

//API read profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

//API read a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send()
        }

        res.send(user);
    } catch (e) {
        res.status(500).send()
    }

});

//API update user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body); //get all key of JSON request's body
    const allowedUpdates = ['name', 'email', 'password', 'age']; //all field of User model allowed to update
    const isValidOperation = updates.every(update => allowedUpdates.includes(update)) //check valid

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

//API delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;