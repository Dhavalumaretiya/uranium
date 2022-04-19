const express = require('express');
const router = express.Router();
const usercontroller = require("../controllers/userController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/simplecode", commonMW.mid1,commonMW.mid2,commonMW.mid3,commonMW.mid4,usercontroller.simpleCode )




module.exports = router;