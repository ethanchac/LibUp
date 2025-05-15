//Sets up the mongoDB connection
const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoose connected");
    }catch(err){
        console.log("no connection");
        process.exit(1);
    }
}

module.exports = connectDB;