const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('database runnning');
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting on database');
    }
}

module.exports = {
    dbConnection
}