import mongoose from "mongoose";


const connectToDb = async ()=>{
   const conn = await mongoose.connect(process.env.MONGO_URL);
   console.log(conn.connection.host);
}


export default connectToDb;