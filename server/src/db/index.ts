import mongoose from "mongoose";
import env from "../endpoints.config";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${env.MONGO_URL}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB conntection Failed  ", error);
        
    }
}

export default connectDB