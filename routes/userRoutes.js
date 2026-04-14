const express = require('express');
const router = express.Router();
const User = require('../model/user.js');
const {jwtAuthMiddleware , generateToken} = require('../jwt.js');


router.post('/signup' , async (req,res) => {
    try {
        const data = req.body;

        const newUser = new User(data);

        const response = await newUser.save();
        console.log('data saved successfully');

        const payload = {
            id : response.id
        }

        const token = generateToken(payload);

        return res.status(201).json({response: response , token: token});
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Internal server error"});
    }
})

router.post('/login', async(req,res) => {
    try {
        const{aadharCardNumber} = req.body;

        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        if(!user){
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const payload = {
            id : User.id
        }

        const token = generateToken(payload);
        res.json({token});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Internal server error"});
    }
})

router.get('/profile' , jwtAuthMiddleware , async(req,res)=> {
    try {
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Internal server error"});
    }
})

router.put('/profile/password' , jwtAuthMiddleware , async(req,res)=> {
    try {
        // extract the user id from the token
        const userId = req.user.id;
        const {currentPassword , newPassword} = req.body;

        const user = await User.findById(userId);

        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        user.password = newPassword;
        await user.save();

        console.log('Password updated successfully');
        res.status(200).json({message: 'Password updated'});

    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Internal server error"});
    }
})

module.exports = router;