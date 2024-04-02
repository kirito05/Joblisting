const User = require("../Models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userRegistration = async (req,res)=>{
    try{

        const {name, email, mobile, password} = req.body;

        if(!name || !email || !mobile || !password){
            return res.status(400).json({
                errorMessage:"Please enter all the required fields"
            })
        }
        const isEmailUnique = await User.findOne({email:email});
        if(isEmailUnique){
            return res.status(400).json({
                errorMessage:"Email already exists"
            })
        }

        const encryptPassword = await bcrypt.hash(password,10)

        const newUser = User.create({
            name,
            email,
            mobile,
            password : encryptPassword
            
        })
        res.status(200).json({
            message:"User registered successfully"
        })

    }catch (err) {
        res.status(500).json({
          message: "Internal Server Error",
        });
    }
}


const userLogin = async (req,res)=>{

    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(500).json({
                errorMessage: "Please enter all the required fields"
            })
        }

        const userDetails = await User.findOne({email})
        if(!userDetails){
            return res.status(400).json({
                errorMessage: "User not found"
            })
        }

        const passwordMatch = await bcrypt.compare(password, userDetails.password)
        if(!passwordMatch){
            return res.status(400).json({
                errorMessage: "Invalid credentials"
            })
        }
        const token = jwt.sign({id:userDetails._id, name: userDetails.name}, process.env.JWT_SECRET)
        res.status(200).json({
            message: "User logged in successfully",
            token: token
        },{expiresIn: "1h"})
    }catch (err) {
        res.status(500).json({
          message: "Internal Server Error",
        });
    }
}


module.exports = { userRegistration, userLogin };