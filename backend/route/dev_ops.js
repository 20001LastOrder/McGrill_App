const router = require('express').Router();
const mongoose = require('mongoose');
require('dotenv').config();

// clear database
router.post('/clear', async (req, res)=>{
    try{
        await mongoose.connection.dropDatabase();
        res.status(201).send();
    }catch(e){
        console.log('database drop failed');
        console.log(e);
        res.status(400).send();
    }
});

module.exports = router;