const router=require('express').Router()
const {OTVForEmail} = require('../Models/oneTimeVerificationTokens')
const {User} =require('../Models/user')

router.get('/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Find the details of  the  provided verification token 
        const otvToken = await OTVForEmail.findOne({ tokenString: token });
        // Find the user with the provided verification token
        const user = await User.findOne({email: otvToken.email});
        if (!otvToken) {
            return res.status(404).json({ error: 'Invalid verification token.' });
        }
        
        // Mark the token as used and user as verified
        otvToken.isUsed = true;
        user.IsEmailVerified=true
        await user.save();
        await otvToken.save();

        res.status(200).json({ message: `Hey ${user.username},Your Email: ${user.email} have been successfully verified. You can now log in.` });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'An error occurred while verifying the email.' ,});
    }
});

router.post('/', async (req, res) => {
    try {
        const { tokenString } = req.body;

        // Find the details of  the  provided verification token 
        const otvToken = await OTVForEmail.findOne({ tokenString: tokenString });
        // Find the user with the provided verification token
        const user = await User.findOne({ email: otvToken.email });
        if (!otvToken) {
            return res.status(404).json({ error: 'Invalid verification token.' });
        }

        // Mark the token as used and user as verified
        otvToken.isUsed = true;
        user.IsEmailVerified = true
        await user.save();
        await otvToken.save();

        res.status(200).json({ message: `Hey ${user.username},Your Email: ${user.email} have been successfully verified. You can now log in.` });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'An error occurred while verifying the email.', });
    }
});

module.exports = router;