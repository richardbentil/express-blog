const mongoose = require('mongoose');

const connectToDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}

module.exports = connectToDb;