const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/DBconnect');
const cors = require('cors');


const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json())
app.use(
    cors({
        origin: "https://tasty-tales-ild7.onrender.com", // Your frontend URL
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,authorization",
        credentials: true, // If you're handling authentication
    })
);

app.use("/images", express.static("public/images"));

app.use("/", require("./routes/user"));
app.use("/recipe", require('./routes/recipe')); 


app.listen(PORT, (error)=>{
    console.log(`Server is running on port ${PORT}`);
})