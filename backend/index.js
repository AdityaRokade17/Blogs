const express = require("express")
const app = express();
var cors = require("cors");

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT;

app.use(
    cors({
      origin: "*",
    })
);

//middleware to parse json to req body
app.use(express.json());

//Routes
const blogRoutes = require("./routes/blogRoutes")
//Mount routes
app.use("/api/v1", blogRoutes)

//server start
app.listen(PORT , (req, res) => {
    console.log(`server is running on ${PORT}`)
})

//database connect
const dbConnect = require("./config/db");
dbConnect();
