const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//1st

const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let savedData = await userModel.create(data);
      res.status(201).send({ msg: "Data save in DB successfully.", savedData });
    }
    else res.status(400).send({ msg: "Bad Requst." });
  }
  catch {
    res.status(500).send({ msg: "Server Error." });
  }

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
  try {
    let mobileNo = req.body.mobile;
    let password = req.body.password;

    let user = await userModel.findOne({ mobile: mobileNo, password: password });
    if (!user) res.status(401).send({ status: false, msg: "Unauthorized information please check your MobileNo or the password" });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "Uranium",
        organisation: "FUnctionUp",
      },
      "Functionup-Uranium"
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, mag: "Token successfully created. ", data: token });
  }

  catch {
    res.status(500).send({ msg: " Internal Server Error." })
  }
};
module.exports.loginUser = loginUser;



// 3rd
// If a token is present then decode the token with verify function
// verify takes two inputs:
// Input 1 is the token to be decoded
// Input 2 is the same secret with which the token was generated
// Check the value of the decoded token yourself

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;

    let userData = await userModel.findById(userId);
    if (!userData)
      res.status(401).send({ status: false, msg: " No such user exists in our DB ,please check your Id. " });


    res.status(201).send({ status: true, msg: "Deatils fetch successfully.", data: userData });
  }
  catch {
    res.status(500).send({ msg: " Internal Server Error." });
  }
};

module.exports.getUserData = getUserData;

// @ts-check
// 4th

const updateUser = async function (req, res) {
  try {
    let userid = req.params.userId;
    let user = await userModel.findById(userid);

    if (!user)
      res.status(401).send({ status: false, msg: " No such user exists." });

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userid },
      { $set: userData },
      { new: true },
    );
    res.status(201).send({ status: true, msg: "Deatils update successfully.", data: updatedUser });
  }
  catch {
    res.status(500).send({ msg: " Internal Server Error." });
  }

};

module.exports.updateUser = updateUser;


//5th

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isDeleted: true } },
      { new: true }
    )

    res.status(201).send({ status: true, data: user });
  }
  catch {
    res.status(500).send({ msg: " Internal Server Error." });
  }
};

module.exports.deleteUser = deleteUser;




// Authorization...
const postmessage = async function (req, res) {
  let msg = req.body.msg

  let user = await userModel.findById(req.params.userId)

  if (!user) return res.status(401).send({ status: false, msg: "NO such user exists" })
  let updatemsg = user.posts
  updatemsg.push(msg)
  let updateuser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatemsg }, { new: true })

  return res.send({ status: true, msg: updateuser })
}
module.exports.postmessage = postmessage


