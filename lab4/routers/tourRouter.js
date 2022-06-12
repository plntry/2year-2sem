const express = require('express');
const router = express.Router();

const controller = require('../controllers/tourController')

router.get("/get", controller.getAll)
router.post("/create", controller.create)
router.post("/delete", controller.delete)
router.get("/search/:name", controller.searchByName)

module.exports = router
