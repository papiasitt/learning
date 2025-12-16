
const express = require('express');
const router = express.Router();

const utilityController = require('./../utility/utilityController');


router.get('/', (req, res) => {
    res.send('<h1>Welcome Admin!</h1>');
});


router.get('/get/books', utilityController.getBooks);
router.post('/save/books', utilityController.saveBooks);
router.post('/delete/books/:id', utilityController.deleteBooks);

module.exports = router;