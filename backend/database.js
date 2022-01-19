const mongoose = require("mongoose");

function DbConnect(){
    const DB_URL = process.env.DB_URL;
    // Database connection
    mongoose.connect(DB_URL) 
    .then(function(){
        console.log('db connected');
    })
    .catch(function(err){
        console.log(err);
    })
}

module.exports = DbConnect;