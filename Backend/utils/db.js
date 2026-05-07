import mongoose from 'mongoose';

const connectDB = async () => {
    console.log("Connecting to MongoDB...");
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully")
    }catch(error){
        console.log(error);
    }
}

export default connectDB;