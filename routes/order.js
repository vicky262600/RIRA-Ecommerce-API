const router = require("express").Router();
const Order = require("../models/Order")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//create orders
router.post("/", verifyToken, async(req, res)=>{
    try{
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    }catch(err){
        res.status(501).json(err);
    }
});

//update order
router.put("/:id", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(201).json(updatedOrder);
    }catch(err){
        res.status(501).json(err);
    }
});

//delete order
router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(201).josn("The order has been deleted!");
    }catch(err){
        rs.status(501).json(err);
    }
});

//get user's Order
router.get("/find/:userId", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const orders = Order.find({userId: req.params.userId});
    }catch(err){
        res.status(501).json(err);
    }
});

//get all orders
router.get("/", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const order = await Order.find();
        res.status(200).josn(order);
    }catch(err){
        res.status(501).josn(err);
    }
});

//get monthly income
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try {
        const income = await Order.aggregate([
          { $match: { createdAt: { $gte: previousMonth } } },
          {
            $project: {
              month: { $month: "$createdAt" },
              sales: "$amount",
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: "$sales" },
            },
          },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
