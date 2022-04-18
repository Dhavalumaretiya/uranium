const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const pubController= require("../controllers/authorController")
const bookController= require("../controllers/authorController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor)
router.post("/createPublisher", pubController.createPublisher)
router.post("/createBook", bookController.createBook)
router.get("/getallData", bookController.getallData)

router.put("/editBookData", bookController.editBookData)    
router.put("/incBookData", bookController.incBookData)


module.exports = router;