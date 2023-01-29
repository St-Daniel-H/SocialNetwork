//connect to database and start the server!
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config({path:"./src/BackEnd/.env"});
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
  console.error(err);
});

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT  || 8000;//if PORT can't be accessed

MongoClient.connect(process.env.MONGOURI, {
        
         maxPoolSize: 50,
         wtimeoutMS: 2500,
         useNewUrlParser: true
         })
         .catch(err =>{ //if there is an error, catch it 
            console.log(err.stack);
            process.exit(1);
         })
         .then(async client =>{
            app.listen(port, ()=>{ //start webserver after database is connected to!
                console.log('listening on port' + port);
            })
         });