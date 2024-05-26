require('dotenv').config();
const connectToDB = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.MESHTABLE;

console.log("Databse : ",database);

async function getMesh(){
    let client;
    try{
        client = await connectToDB();
        let db = client.db(database);
        let collection = db.collection(collectionName);

        let data = await collection.find({}).toArray();
        // console.log("Data :  ",data);

        return {
            statusCode: 200,
            body: data
        };                                
    }catch(e){
        console.log("Error Fetching User : ", e.message);
        return {
            statusCode: 500,
            body: e.message
        };
    }
}


// getMesh().then((res) => {
//     if (res) {
//         console.log(res)
//     }
// })



module.exports = getMesh;