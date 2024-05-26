require('dotenv').config();
const connectToDb = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.MESHTABLE;

async function getMesh(meshName) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);
        
        let data = await collection.findOne({
            "meshName" : meshName
        });

        if (data) {
            return {
                statusCode : 200,
                body : data
            }
        }

        return {
            statusCode : 400,
            body : "Invalid Mesh Name"
        }

    } catch (error) {
        console.error('Error:', error.message);
        // throw error;
        return {
            statusCode : 500,
            body : error.message
        }
    } finally {
        if (client) {
            console.log("Monogo Connection closing");
            await client.close();
            console.log("Monogo Collection close");
        }

    }
}

module.exports = getMesh;
