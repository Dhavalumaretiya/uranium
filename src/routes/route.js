const express = require('express');
const router = express.Router();
const bookModel= require("../books/bookModel.js")
const bookController= require("../bookcontrollers/bookController.js")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createbook", bookController.createbook )

router.get("/getbook", bookController.getbookData)

module.exports = router;