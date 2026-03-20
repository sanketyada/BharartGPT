import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const con = await mongoose.connect(`${process.env.MONGODB_URI}/BharatGPT`);
    console.log(`Database Connected:${con.connection.host}`);
  } catch (error) {
    console.log(`Database Unable To Connect:${error.message}`);
    process.exit(1);
  }
};
export default ConnectDB;