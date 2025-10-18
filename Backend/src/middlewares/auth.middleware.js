const foodPartnerModel = require('../models/foodpartner.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


 async function authFoodPartnerMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please login first",
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET || 'dev-secret');

        // token payloads use `id` when created by the auth controller
        const partnerId = decoded.id || decoded._id;
        if(!partnerId){
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        const foodPartner = await foodPartnerModel.findById(partnerId);
        if(!foodPartner){
            return res.status(401).json({ message: 'Food partner not found' });
        }

        req.foodPartner = foodPartner;
        next();

    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token!",
        })
    }

 }

 async function authUserMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"User Not logged in",
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decoded._id || decoded.id;
        if(!userId){
            return res.status(401).json({ message: 'Invalid token payload' });
        }
        const user = await userModel.findById(userId);
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token!",
        })
    }
 }

 module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
 }