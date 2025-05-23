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
router.post('/add-book', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { book } = req.body;

    if(!token){
        return res.status(401).json({msg: 'no token'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(404).json({msg: 'user not found'});
        }

        user.libraryItems.push(book);
        await user.save();

        return res.status(200).json({ msg: 'book added', book})
    }catch(err){
        console.log('error adding book:', err);
        res.status(500).json({ msg: 'Server err'});
    }
});
router.put('/update-book/:bookId', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { bookId } = req.params;
    const { book } = req.body;

    console.log("Update book request:");
    console.log("- bookId:", bookId);
    console.log("- book data:", book);

    if(!token){
        return res.status(401).json({msg: 'no token'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(404).json({msg: 'user not found'});
        }

        // Find the book in the libraryItems array
        const bookIndex = user.libraryItems.findIndex(
            item => item._id.toString() === bookId
        );

        console.log("Found book at index:", bookIndex);

        if (bookIndex === -1) {
            return res.status(404).json({ msg: 'Book not found in library' });
        }

        // Update the book (keep the original _id)
        const originalId = user.libraryItems[bookIndex]._id;
        user.libraryItems[bookIndex] = {
            _id: originalId,
            title: book.title,
            author: book.author,
            urgency: book.urgency,
            read: book.read
        };

        await user.save();
        
        console.log("Book updated successfully");
        res.status(200).json({ 
            msg: 'Book updated successfully', 
            book: user.libraryItems[bookIndex] 
        });

    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

module.exports = router;