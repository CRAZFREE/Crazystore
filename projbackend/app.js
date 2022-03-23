require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const app = express();
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const stripe = require('stripe')

//Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment")

//Connecting to MongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED.....")
}).catch(() => {
    console.log("DB got DISCONNECTED!!!!");
});

//MiddleWare
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api/crazstore", authRoutes);
app.use("/api/crazstore", userRoutes);
app.use("/api/crazstore", categoryRoutes);
app.use("/api/crazstore", productRoutes);
app.use("/api/crazstore", orderRoutes);
app.use("/api/crazstore",stripeRoutes);

//Port
const port = process.env.PORT || 7002;


//Server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});