import mongoose from "mongoose";

const dbConnect  = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Databse connected on host :" , connect.connection.host);
    } catch (error) {
        console.log("Databse connection error : ", error);
    }
}

export {dbConnect}