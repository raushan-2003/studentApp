require('dotenv').config();

const { MongoClient } = require('mongodb');

const uri = process.env.URI;
const client= new MongoClient(uri);

console.log("Connection Start");

async function main(){
    try{
        return await client.connect();
        // await client.connect();
        // console.log("Connected to MongoDB");
        // return client.db(database);
    }
    catch(e){
        console.log("Failed to connect MongoDb",e.message);
        process.exit(1);
    }
}

main();

module.exports = main;