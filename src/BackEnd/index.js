//connect to database and start the server!
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config({path:"./src/BackEnd/.env"});

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