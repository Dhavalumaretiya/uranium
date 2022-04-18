const express = require('express');
const router = express.Router();

const userController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post("/createBatch", userController.createBatch)
router.post("/createDevloper", userController.createDevloper)

router.get("/scholarshipData", userController.scholarshipData)
router.get("/developers", userController.developers)

module.exports = router;


















// router.post("/createAuthor", authorController.createAuthor)
// router.post("/createPublisher", pubController.createPublisher)
// router.post("/createBook", bookController.createBook)
// router.get("/getallData", bookController.getallData)

// router.put("/editBookData", bookController.editBookData)    
// router.put("/incBookData", bookController.incBookData)


module.exports = router;
