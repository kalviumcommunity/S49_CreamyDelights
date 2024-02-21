const express = require('express');
const router = express.Router();

router.put('/put', async (req, res) => {
    res.json({ Message: 'Data is updated.' });
});

router.post('/post', async (req, res) => {
    res.json({ Message: 'Data is posted.' });
});

router.delete('/delete', async (req, res) => {
    res.json({ Message: 'Data is deleted.' });
});

router.get('/get', async (req, res) => {
    res.json({ Message: 'Data is fetched.' });
});

module.exports = router;