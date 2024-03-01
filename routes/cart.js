const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");
const Cart = require("../models/Cart");

const router = require("express").Router();

// Create
router.post("/", verifyTokenAndAdmin, async(req, res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCard = await newCart.save();
        res.status(201).json(savedCard);
    }catch(err){
        res.status(501).json(err);
    }
});

// update
router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(201).json(updatedCart);
    }catch(err){
        res.status(201).json(err);
    }
});

// Delete
router.delete("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(201).json("The cart has been deleted!");
    }catch(err){
        res.status(501).json(err)
    }
});

// get user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(501).json(err)
    }
});

// get all
router.get("/", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const cart = await Cart.find();
        res.status(200).josn(cart);
    }catch(err){
        res.status(501).josn(err);
    }
});

module.exports = router;
