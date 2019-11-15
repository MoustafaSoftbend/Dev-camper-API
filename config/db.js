const mongoose = require('mongoose');


const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        server: {    
            auto_reconnect: true,    
            socketOptions: {     
              keepAlive: 1,    
              connectTimeoutMS: 90000,    
              socketTimeoutMS: 90000,
              maxTimeMS: 20000,    
            }    
            },    
        replset: {    
            auto_reconnect: true,    
            socketOptions: {    
                keepAlive: 1,    
                connectTimeoutMS: 90000,    
                socketTimeoutMS: 90000,
                maxTimeMS: 20000,    
            }    
        }
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;