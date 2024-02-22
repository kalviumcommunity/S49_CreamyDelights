const express = require('express');
const router = express.Router();

router.put('/put', async (req, res, next) => {
    try {
        // Your update logic here
        res.json({ Message: 'Data is updated.' });
    } catch (error) {
        next(error); // Pass the error to Express error handling middleware
    }
});

router.post('/post', async (req, res, next) => {
    try {
        // Your create logic here
        res.json({ Message: 'Data is posted.' });
    } catch (error) {
        next(error); // Pass the error to Express error handling middleware
    }
});

router.delete('/delete', async (req, res, next) => {
    try {
        // Your delete logic here
        res.json({ Message: 'Data is deleted.' });
    } catch (error) {
        next(error); // Pass the error to Express error handling middleware
    }
});

router.get('/get', async (req, res, next) => {
    try {
        // Your fetch logic here
        res.json({ Message: 'Data is fetched.' });
    } catch (error) {
        next(error); // Pass the error to Express error handling middleware
    }
});

module.exports = router;
