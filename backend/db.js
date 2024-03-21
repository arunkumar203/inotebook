const mongoose = require('mongoose');

async function connectToMongoDB() {
    // const uri = 'mongodb://localhost:27017/inotebook'; // Replace with your MongoDB connection string
    const uri='mongodb://localhost:27017/inotebook';

    try {
        await mongoose.connect(uri, {  });
        console.log('Connected to MongoDB');

        // Add your database operations here

    } catch (error) {
        //eslint-disable-next-line
        console.log('error in connecting');
    }
}

// connectToMongoDB();
module.exports = connectToMongoDB;