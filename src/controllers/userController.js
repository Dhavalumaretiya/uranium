
const simpleCode= async function(req, res) {
   
    console.log( "Hey man, congrats you have reached the Handler.")

    res.send({ msg: "This is coming from controller."})
}

module.exports.simpleCode=simpleCode;