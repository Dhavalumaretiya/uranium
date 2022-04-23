const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const Auth = require("../mideelware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/users", userController.createUser);

router.post("/login",  userController.loginUser);

//The userId is sent by front end
router.get("/users/:userId", Auth.authUser, userController.getUserData);

router.put("/users/:userId", Auth.authUser, userController.updateUser);

router.post("/users/:userId/posts", Auth.authUser, userController.postmessage);

router.delete("/users/:userId", Auth.authUser, userController.deleteUser);

module.exports = router;