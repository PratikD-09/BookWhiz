const { application } = require('express');
const User = require('../Models/User');
const { verifyToken, verifyTokenAndAutherization , verifyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router()


router.put('/:id' ,verifyTokenAndAutherization, async (req , res)=>{
    if( req.body.passward ){
        req.body.passward = await bcrypt.hash(password, 10);
    }
    
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id ,
            {
                $set: req.body
            },
            {
                new: true
            }
        ) 
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/stats', async (req, res) => {
    const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { 
                $project: { 
                    month: { $month: "$createdAt" } 
                } 
            },
            { 
                $group: { 
                    _id: "$month", 
                    total: { $sum: 1 } 
                } 
            }
        ]);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User by ID
router.get('/:id', verifyTokenAndAdmin , async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc; // Exclude password
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get('/', verifyTokenAndAdmin , async (req, res) => {
    const query = req.query.new
    try {

        const users = query
         ? await User.find().sort({ _id : -1}).limit(5) 
        : await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete User
router.delete('/:id', verifyTokenAndAutherization , async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (error) {
        res.status(500).json(error);
    }
});




module.exports  = router