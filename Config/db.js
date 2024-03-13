const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb Connection Established Successfully Cluster Address: ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Database Connection Refused`.bgRed.white)
    }
}

module.exports = connectDB;