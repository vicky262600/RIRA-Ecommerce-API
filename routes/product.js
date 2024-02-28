const router = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// Creat
router.post("/", async(req, res)=>{
    const product = new Product(req.body);
    try{
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    }catch(err){
        res.status(501).json(err)
    }
})



module.exports = router;
