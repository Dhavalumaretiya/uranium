const express = require('express');
const router = express.Router();
const userController = require("../controllers/userControllers")
const booksController = require("../controllers/booksController")
const reviewController = require("../controllers/reviewControllers")
const {authentication,authentication} = require("../middleWare/middleWare")

// User
router.post("/user",userController.createUser)
router.post("/login", userController.loginUser)
// Book
router.post("/books", authentication,booksController.createBook) 
router.get("/getBooks", authentication, booksController.getBook)
router.get("/getBook/:bookId", authentication,booksController.getById)
router.put("/updateBook/:bookId", authentication ,authorisation,booksController.updateById)
router.delete("/deleteBook/:bookId", authentication, authorisation,booksController.deleteById)
// Review
router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReviewById)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReviewById)
module.exports = router;     
