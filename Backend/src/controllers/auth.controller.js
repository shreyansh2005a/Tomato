const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const foodPartnerModel = require('../models/foodpartner.model');

async function authRegisterUser(req,res){
    const {fullName,email,password} = req.body;
    const isUserAlreadyExists = await userModel.findOne({email:email});

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User Already Registered",
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullName,
        email,
        password:hashedPassword,
    });
    
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET);
    
    res.cookie("token",token);

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
        }
    });
}

async function authLoginUser(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email:email});

    if(!user){
        return res.status(400).json({
            message:"User Not registered",
        });
    }

    const isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword){
        return res.status(400).json({
            message:"User Entered Wrong Password",
        });
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
        }
    });
}

async function authLogoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User Logout Successfully",
    });
}

async function authFoodPartnerRegister(req,res){
    const {name,email,password,phone,address,contactName} = req.body;
    // console.log(req.body);

    try {
        const foodPartnerAlreadyExists = await foodPartnerModel.findOne({email:email});

        if(foodPartnerAlreadyExists){
            return res.status(400).json({
                message:"Food Partner already registered",
                foodpartner:{
                    _id:foodPartnerAlreadyExists._id,
                    email:foodPartnerAlreadyExists.email,
                    name:foodPartnerAlreadyExists.name
                }
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const foodpartner = await foodPartnerModel.create({
            name,
            email,
            password:hashedPassword,
            phone,
            contactName,
            address
        });

        const token = jwt.sign({
            id:foodpartner._id,
        },process.env.JWT_SECRET || 'dev-secret');

        res.cookie("token",token);

        return res.status(201).json({
            message:"Food Partner registered successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function authFoodPartnerLogin(req,res){
    const {email,password} = req.body;
    const foodpartner = await foodPartnerModel.findOne({email:email});
    if(!foodpartner){
        return res.status(400).json({
            message:"Invalid email or password",
        })
    }

    const isValidPassword = await bcrypt.compare(password,foodpartner.password);
    if(!isValidPassword){
        return res.status(400).json({
            message:"Food Partner entered wrong password",
        })
    }

    const token = jwt.sign({
        id:foodpartner._id,
    },process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(200).json({
        message:"Food Partner Logged in successfully",
    })
}

async function authFoodPartnerLogout(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"Food Partner Logout Successfully",
    });
}

module.exports = {
    authRegisterUser,
    authLoginUser,
    authLogoutUser,
    authFoodPartnerRegister,
    authFoodPartnerLogin,
    authFoodPartnerLogout
}
