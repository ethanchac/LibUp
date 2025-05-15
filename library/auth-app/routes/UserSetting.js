const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/me', async (req, res) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        
        if(!token){
            console.log("No token");
            return res.status(401).json({msg: 'No token'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            console.log("user not found");
            return res.status(404).json({msg: 'user not found'});
        }

        res.json({ libraryItems: user.libraryItems });
    }catch(err){
        console.log("server error");
        res.status(500).json({ msg: 'Server error', error: err.message});
    }
});

module.exports = router;