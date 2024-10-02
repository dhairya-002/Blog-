const mongoose =require( 'mongoose');
const colors=require('colors')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery',false)
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connected to mongoDB ${mongoose.connection.host}`.bgMagenta.white);
    }
    catch (error) {
        console.log(`mongoDB error ${error}`.bgRed.white);

    }
};
module.exports=connectDB;