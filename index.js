const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log("db connection successful"))
    .catch((err)=>{console.log(err);
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("backend is running");
});