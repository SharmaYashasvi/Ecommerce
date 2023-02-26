const mongoose = require("mongoose");
const connectDatabase =()=>{
    mongoose.connect(process.env.DB_URI).then(
        (data)=>{
            console.log(`mongodb is connected on ${data.connection.host}`)  
        }
    )
    // we have no need of catch block because we handle this error in unhandled promise rejaction 
    // .catch((err)=>{
    //     console.log(err);
    //   }
    //  )
}

module.exports = connectDatabase;