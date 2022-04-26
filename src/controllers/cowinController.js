

let axios = require("axios");
const { options } = require("nodemon/lib/config");

//1st
let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getStates = getStates

// 2nd
let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
module.exports.getDistricts = getDistricts

// 3rd
let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getByPin = getByPin

// 4th

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
module.exports.getOtp = getOtp

// 1st Assignment....
let getByDistrict = async function (req, res) {
    try {
        let district = req.query.district_id
        let date = req.query.date
        console.log(`query params are: ${district} ${date}`)
        var options = {
            method: "get",
            url:`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getByDistrict=getByDistrict

// 2nd 

const getTemp = async function(req, res) {
    try{
        let cities =  req.body.cities || ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        if(req.query.city){
            let fetch = {
                method: 'get',
                url: `http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=5da8ac0a5e58655a0f56367287200722`
            }
            let result = await axios(fetch)
            return res.status(200).send({Tempeature: result.data.main.temp})
        }
        let result = []
        for(let i in cities){
            let options = `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=5da8ac0a5e58655a0f56367287200722`
            let put = (await axios.get(options)).data.main
            result.push({city: cities[i], temp: put.temp})
        }
        result.sort((a,b) => {return a.temp - b.temp})
        res.status(200).send({msg: result})
    }catch(err){
        res.status(500).send({msg: err.message});
    }
}

module.exports.getTemp=getTemp;


//3rd{a} 

let getAllMeme = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://api.imgflip.com/get_memes'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message });
    }
}

module.exports.getAllMeme=getAllMeme;

// 3rd (b)
const getMeme = async function(req, res) {
    try{
        let id = req.query.template_id
        let t0 = req.query.text0
        let t1 = req.query.text1
        let userName = req.query.username 
        let password = req.query.password
        let fetch = {
            method: 'post',
            url: `https://api.imgflip.com/caption_image?template_id=${id}&text0=${t0}&text1=${t1}&username=${userName}&password=${password}`,
            Data : id,t0,t1,userName,password
        }
        let result = await axios(fetch)
        res.status(200).send({msg: result.data})
        console.log(result)
    }catch(err){
        res.status(500).send({msg: err.message})
    }
};

module.exports.getMeme=getMeme;