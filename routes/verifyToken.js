const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
    const authHeader = req.header.token;
    if(authHeader){
        jwt.verify(token, process.env.JWT_SEC, (err, user) =>{
            if(err) res.status(403).json("token is not valid");
            req.user = user;
            next();
        })
    }
    else{
        return res.state(401).json("You are not authenticated !"); 
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    cerifyToken(req, res, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("you are not allowed to fo that!")
        }
    })
} 

module.exports = [verifyToken, verifyTokenAndAuthorization]; 