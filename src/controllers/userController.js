// const req = require("express/lib/request")
//@ts-check
// const UserModel= require("../models/userModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");

//1st
const createProduct= async function (req, res) {
    let product = req.body
    let saved= await productModel.create(product)
    res.send({msg: saved})};

module.exports.createProduct=createProduct;


//2nd
const createUser= async function (req, res) {
        let creat = req.body
        let savedData= await userModel.create(creat)
        res.send({msg: savedData})};

module.exports.createUser=createUser;


//3rd

const createOrder = async (req, res) => {
    let freeUser = req.isFreeAppUser
    if(!req.body.userId && !req.body.productId) return res.send({msg: "userId and productId is required"})

    let userbalance = await userModel.findOne({_id: req.body.userId}).select('balance')
    let productPrince = await productModel.findOne({_id: req.body.productId}).select('price')

    if(!freeUser && userbalance.balance >= productPrince.price){
        let newBalance = userbalance.balance - productPrince.price
        let orderData = await orderModel.create({
            userId: req.body.userId,
            productId: req.body.productId,
            amount: productPrince.price,
            isFreeAppUser: false
        })

        await userModel.findOneAndUpdate({_id: req.body.userId}, {balance: newBalance})
        res.send({msg: orderData})
    }

    if(!freeUser && userbalance.balance < productPrince.price) return res.send({msg: " Balance is insufficient."})
    if(freeUser){
        let orderData = await orderModel.create({
            userId: req.body.userId,
            productId: req.body.productId,
            amount: 0,
            isFreeAppUser: true
        })

        res.send({msg: orderData})
    }
}

module.exports.createOrder=createOrder;




// ===============================================================================================

// const basicCode= async function(req, res) {
//     let tokenDataInHeaders= req.headers.token
//     console.log(tokenDataInHeaders)
//     //counter
//     console.log( "HEADER DATA ABOVE")
//     console.log( "hey man, congrats you have reached the Handler")
//     res.send({ msg: "This is coming from controller (handler)"})
    
//     }


// const createAUser = function(req, res) {
//     let requestBody = req.body
//     let headers  = req.headers
    

//     //Printing all the headers before modification - addition of a new header called 'month'
//     console.log('Request headers are before: ', headers)

//     //Accessing a request header called 'batch'
//     let batchHeader = headers["batch"] // headers.batch 
    
//     ///Accessing a request header called 'content-type'
//     let contentHeader = headers['content-type'] // headers.content-type

//     console.log('Content Type hedser is: ',contentHeader)
//     console.log('Batch header is: ', batchHeader)

//     //Adding a new requets header
//     req.headers["month"] = 'April' //req.headers.month = 'April' or req.headers["month"] = 'April'


//     //Printing the headers after modification - addition of a new header called 'month'
//     console.log('Request headers are after: ', headers)


//     console.log('Request property called current-day', req['current-day'])
    
//     //Adding a response header
//     res.header('year', '2022')

//     res.send('Just create a user')
// }

// module.exports.createAUser = createAUser
// module.exports.basicCode = basicCode

// const createUser= async function (req, res) {
//     let data= req.body
//     let savedData= await UserModel.create(data)
//     res.send({msg: savedData})
// }

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }

// module.exports.createUser= createUser
// module.exports.getUsersData= getUsersData
// module.exports.basicCode= basicCode