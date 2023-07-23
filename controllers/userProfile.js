// userRoutes.js
const express = require('express');
const router = express.Router();
const {User} = require('../Models/user');
const {verifyToken,extractUserIdFromToken}=require('../middlewires/tokenVerification');
const { use } = require('./messages');

// Get User Profile
router.get('/', async (req, res) => {
    try {
        const useID=extractUserIdFromToken(req)
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update User Profile
router.put('/', async (req, res) => {
    try {
        const { fullName, phoneNumber,image,email,username,password } = req.body;
        const useID = extractUserIdFromToken(req)
        const user = await User.find({_id:useID,username,email});
        if (!user) {
            return res.status(404).json({ message: 'enable to update because u provided wrong username or password' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send({ message:
             'Invalid username or Password' });
        user.fullName=fullName;
        user.phoneNumber=phoneNumber;
        user.image=image;

        await user.save()
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
