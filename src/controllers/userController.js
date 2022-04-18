const batchModel = require("../models/batchModel");

const devloperModel = require("../models/devloperModel");

// 1st  ===========================================================================
const createBatch = async function(req,res){
    let data = req.body
    let batchData = await batchModel.create(data)
    res.send(batchData)
};

module.exports.createBatch=createBatch;

// 2nd  ===========================================================================

const createDevloper = async function(req,res){
    let devloperdata = req.body
    let createDevloper = await devloperModel.create(devloperdata)
    res.send(createDevloper)
};

module.exports.createDevloper=createDevloper;

// 3rd  ===========================================================================

const scholarshipData = async function(req,res){

    let  eligibility= await devloperModel.find(
        {$and:[{gender:"female"},{percentage:{$gte:70}}]}).populate("batch");
    res.send({Data:eligibility});
};

module.exports.scholarshipData=scholarshipData;



// 4th ===========================================================================


const developers = async function (req, res) {
    // console.log(req.query)
    const getdata = req.query.name
    const getpercentage = req.query.percentage
    
    //get id from Uranium or thorium batch as per query 
    const getbatchId = await batchModel.findOne({ name: getdata }).select({_id:1})
    //find data of that id in developer and show data which is greater than query percentage
    // console.log(getbatchId)
    const getDev = await devloperModel.find({batch : getbatchId,percentage:{ $gt:getpercentage}}).populate('batch').select({_id:0,createdAt:0,updatedAt:0})
    
    res.send({ msg: getDev });
}
module.exports.developers=developers;

// ===========================================================================














// // =======================================================
// //1st
// const createAuthor = async function(req,res){
//     let data = req.body
//     let authorData = await authorModel.create(data)
//     res.send(authorData)
// };

// module.exports.createAuthor=createAuthor;

// // =================================================================
// //2nd
// const createPublisher = async function(req,res){
//     let pubdata = req.body
//     let publisherData = await pubModel.create(pubdata)
//     res.send(publisherData)
// };

// module.exports.createPublisher=createPublisher;

// // =====================================================================
// //3rd

// const createBook= async function (req, res) {
//     let book = req.body
//     let authorId = book.author
//     let publisherId = book.publisher

//     //3 a)
//     if(!authorId) {
//         return res.send({message: "Author id must be present in the book detials"})   
//     }

//     //3 b)
//     let author = await authorModel.findById(authorId)

//     if(!author) {
//         return res.send({message: "Not a valid author id"})
//     }

//     //3 c)
//     if(!publisherId) {
//         return res.send({message: "Publihser id must be present in the book details"})
//     }

//     //3 d)
//     let publisher = await pubModel.findById(publisherId) 

//     if(!publisher) {
//         return res.send({message: "Not a valid publisher id"})
//     }

//     let bookCreated = await bookModel.create(book)
//     res.send({data: bookCreated})
// }

// module.exports.createBook=createBook;

// // =============================================================================
// //4th
// const getallData = async function(req,res){

//     let allData = await bookModel.find().populate("author publisher")
//     res.send({msg:allData})
// };

// module.exports.getallData=getallData;

// // ==============================================================================
// // 5(a)
 
// const editBookData = async function (req,res) {
     
//     let editdata = await bookModel.updateMany(
//         {$or:[{"publisher":"625abc14a7bbc1ac45a7fce3"},{"publisher":"625b9f2b23b6e883ba632d72"}]},
//          {$set: {"isHardCover": true}})
     
//    res.send({msg:editdata})
// }

// module.exports.editBookData=editBookData;

// // ==============================================================================
// // 5(b)

// const incBookData = async function (req,res) {
     
//     let incpricedata = await bookModel.updateMany(
//      {ratings:{$gt:3.5}},
//      {$inc:{price:10}}
//     );
        
     
//    res.send({msg:incpricedata})
// }

// module.exports.incBookData=incBookData;


// // ======================================================================



