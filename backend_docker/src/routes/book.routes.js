const express = require('express');
const router = express.Router()
const bookController = require('../controllers/book.controllers');


//Rutas CRUD
router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;