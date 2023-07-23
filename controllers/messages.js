const router=require('express').Router()
require('dotenv').config()
const {Message}=require('../Models/messages')
//Token verification function and  Extracting user ID
const {verifyToken,extractUserIdFromToken}=require('../middlewires/tokenVerification')

// POST endpoint to add a new message
router.post('/',verifyToken ,async (req, res) => {
    try {
         const userID = extractUserIdFromToken(req)
        const { replyId, content } = req.body;
        const msg = new Message({
            from: userID,
            content: content,
            replyId: replyId,
        });
        await msg.save();
        res.status(201).json({ message: 'sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET endpoint to retrieve all messages
router.get('/',verifyToken, async(req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE endpoint to delete a message by its ID
router.delete('/:id',verifyToken, async(req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ msg: 'Message  not found' });
        }
        res.json({ msg: 'Message Deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;