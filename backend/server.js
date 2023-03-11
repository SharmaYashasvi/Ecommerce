const app = require('./app');
const cloudinary = require("cloudinary"); // for uploading photo
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling uncaught error -> ike in middle of the server code i write console.log(youtube) so this will handle it
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught error`);
    process.exit(1);
})

//config
dotenv.config({path:"backend/config/config.env"});
// connect to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})



// unhandled promise rejaction error

process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`shutting down the server due to promise rejaction error`);
    // after console log we have to shut down our server and exit from the process
    server.close(()=>{
        process.exit(1);
    });
});
