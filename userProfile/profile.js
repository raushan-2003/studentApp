require('dotenv').config();
const connectToDb = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.USERTABLE;

async function checkUser(req) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        let email = req.email.toLowerCase();
        
        let data = await collection.findOne({
            "email" : email
        });

        if (data) {
            return{
                statusCode : 200,
                body : data
            }
        }else{
            return{
                statusCode : 400,
                body: "Invalid Email"
            }
        }
        
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    } finally {
        if (client) {
            console.log("Monogo Connection closing 11 ");
            await client.close();
            console.log("Monogo Collection close");
        }

    }
}

module.exports = checkUser;
