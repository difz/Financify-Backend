const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const process = require("process");

const app = express();

dotenv.config();

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// CORS
app.use(cors({
    origin: ['https://www.financify.web.id','https://financify.web.id', 'https://financify-gamma.vercel.app'], // Adjust to your frontend URL
    credentials: true, // Allow credentials (cookies)
  }));

//MONGO DB CONNECTION
if (!process.env.MONGO_URI) {
    throw Error("Database connection string not found");
}
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Succesfully connected to MongoDB");
    }).catch((err) => {
        console.log("Failed to connect to MongoDB");
        console.log(err);
    });

//Localhost
app.get("/", (req, res) => {
    res.send("Hello from backend");
});

app.use("/auth", require("./routes/authentication"));
app.use("/account", require("./routes/account"));
app.use("/transaction", require("./routes/transaction"));
app.use('/category', require('./routes/category'));

//App listen
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});