const express = require('express');
const router = express.Router();

const controller = require('../controllers/countryController')

router.get("/get", controller.getAll)
router.post("/create", controller.create)

module.exports = router