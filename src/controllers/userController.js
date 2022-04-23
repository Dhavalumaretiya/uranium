

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//1st

//You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response

const createUser = async function (req, res) {
   let data = req.body;
  let savedData = await userModel.create(data);
//   console.log(abcd.newAtribute);
  res.send({ msg: savedData });
};
module.exports.createUser = createUser;
 
// 2nd
// Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens

const loginUser = async function (req, res) {
  let mobileNo = req.body.mobile;
  let password = req.body.password;

  let user = await userModel.findOne({ mobile:mobileNo, password: password });
  if (!user)
    return res.send({status: false,msg: "MobileNo or the password is not corerct" });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "Uranium",
      organisation: "FUnctionUp",
    },
    "Functionup-Uranium"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};
module.exports.loginUser = loginUser;



// 3rd
 // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself

  const getUserData = async function (req, res) {
    let userId = req.params.userId;
  
    let userData = await userModel.findById(userId);
    if (!userData){
      return res.send({ status: false, msg: "No such user exists." });
    }
  
    res.send({ status: true, data: userData });
  };

module.exports.getUserData = getUserData;


// 4th

const updateUser = async function (req, res) {
    let userid = req.params.userId;
    let user = await userModel.findById(userid);
    
    if (!user) {
      return res.send("No such user exists.");
    }
  
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userid }, 
      { $set: userData},
      { new: true},
      );
    res.send({ status: true, data: updatedUser });
  };

module.exports.updateUser = updateUser;


//5th

const deleteUser = async function(req, res){
    let userId = req.params.userId;
    let user = await userModel.findOneAndUpdate(
      {_id: userId},
      { $set: {isDeleted: true}},
      { new: true}
    )
  
    res.send({status: true, data: user});
  };

  module.exports.deleteUser=deleteUser;
  // module.exports = {a ,b }



  // @ts-check
  const postmessage = async function(req, res){
    let msg = req.body.msg
    
    let user = await userModel.findById(req.params.userId)
    
    if(!user) return res.send({status:false , msg:"NO such user exists"})
    let updatemsg = user.posts
    updatemsg.push(msg)
    let updateuser = await userModel.findOneAndUpdate({_id:user._id},{posts:updatemsg},{new:true})

    return res.send({status:true , msg:updateuser})
  }
module.exports.postmessage=postmessage
  