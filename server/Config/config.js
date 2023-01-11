const mongoose = require('mongoose');

const ConnectDb = () => {
    mongoose.connect(process.env.MONGO_URL,()=>{
        console.log("Db Connected");
    });
}

module.exports = ConnectDb;