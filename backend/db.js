const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://pratik2271:pratik%401624@pratikproject.vglse6e.mongodb.net/bloodbank", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = connectDB;