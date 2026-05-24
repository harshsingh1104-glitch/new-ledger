const usermodel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailservice = require("../services/email.service")

/*
* - user register controller
* - post/api/auth/register
*/



async function userregister(req, res){
    const {email, name, password} = req.body
    const isExists = await usermodel.findOne({
        email: email
    })
    if(isExists){
        return res.status(400).json({
            message: "email already exists",
            status:"failed"
        })
    }
    const user = await usermodel.create({
        email,
        name,
        password
    })

    const token = jwt.sign({userid: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})

    res.cookie("token", token)
    res.status(201).json({
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
      
    await emailservice.sendRegisteremail(user.email,user.name)

}

async function userlogin(req, res){

    const {email, password} = req.body
    // Explicitly select password field
    const user = await usermodel.findOne({email}).select('+password')

    if(!user){
        return res.status(400).json({
            message: "invaild email or password",
        })
    }

    const isvalidpassword = await user.comparepassword(password)

    if(!isvalidpassword){
        return res.status(400).json({
            message: "invaild email or password",
        })
    }

    // Generate JWT token
    const token = jwt.sign({userid: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})

    // Remove password from user object before sending
    const { password: pwd, ...userData } = user.toObject();

    res.cookie("token", token)
    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}

module.exports = {userregister, userlogin}