
const jwt = require("jsonwebtoken");

const authUser = function(req, res, next){
  let token = req.headers["x-Auth-token"];
  if (!token) {
    token = req.headers["x-auth-token"];
  }

  if (!token) {
    return res.send({ status: false, msg: "Token must be present" });
  }

  // Authorization...
  let decodedtoken = jwt.verify(token,"Functionup-Uranium")

  let userTobemodifide = req.params.userId
  let userlogedin =  decodedtoken.userId
  
  if(userTobemodifide != userlogedin) return res.send({status:false,msg:"not allowed to login"})

  
  next()
}

module.exports.authUser = authUser;
