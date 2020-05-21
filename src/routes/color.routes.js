const express = require('express')
const router = express.Router()
const colorController = require('../controllers/color.controllers');
// Retrieve all colors
router.get('/', colorController.findAll);
// Create a new color
router.post('/', colorController.create);
// Retrieve a single color with id
router.get('/:id', colorController.findOne);
// Update a color with id
router.put('/:id', colorController.update);
// Delete a color with id
router.delete('/:id', colorController.delete);
module.exports = router