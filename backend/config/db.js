const mongoose = require("mongoose")

require("dotenv").config();

const dbConnect = () => {

    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then( () => console.log("Db connected Succesfully"))
    .catch( (err) => {
        console.log("Error in Database")
        console.log(err.message);
        process.exit(1);
        
    })

}

module.exports = dbConnect;