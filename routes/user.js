const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();

// update
router.put("/:id", verifyTokenAndAuthorization, (req,res)=>{
    
})

// router.get("/usertest", (req, res)=> {
//     res.send("user test is success")
// });

// router.post("/userposttest", (req, res)=>{
//     const username = req.body.username;
//     res.send("the user name is " + username)
// });
// router.put("/:id", verifyToken, ( rew, res)=>{
    
// })

module.exports = router;