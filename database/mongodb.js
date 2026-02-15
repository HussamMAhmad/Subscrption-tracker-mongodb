import {DB_URI, NODE_ENV} from "../config/env.js";
import mongoose from "mongoose";

if(!DB_URI) {
    throw new Error('please define mongodb URI environment variable inside .env.<development/production>.local');
}

const connecttodatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode`);
    }catch(error){
        console.error("Error connection to database: " , error);
        process.exit(1);
    }
}

export default connecttodatabase;