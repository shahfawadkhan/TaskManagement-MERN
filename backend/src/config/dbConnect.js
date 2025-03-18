import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MongooDbConnection)

       console.log(conn.connection.host);
       console.log("Connected successfully");
       
        // useNewUrlParser : true;
        // useUnifiedTopology : true;
    } catch (error) {
        console.log(error.message);
        
    }
}
export default connectDb;