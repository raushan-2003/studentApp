require('dotenv').config();
const connectToDb = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.LIBRARYTABLE;

// const event = {
//     "libraryId": "lib789",
//     "libraryName": "Downtown Public Library",
//     "address": "Korrah Chowck, Hazaribagh",
//     "contactInfo": "9766965963",
//     "facilities": ["Conference Rooms", "Wi-Fi", "Cafe", "Printing Services"],
//     "chargePerHour": 5
// }



async function addLibrary(req) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        const event = req;

        const { libraryName, address, contactInfo, facilities , chargePerHour} = event;

        // Input validation
        if (!libraryName || !address || !contactInfo || !facilities) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Invalid request: All fields are required" })
            };
        }

        let params = {
            "libraryName": libraryName,
            "address": address,
            "contactInfo": contactInfo,
            "facilities": facilities,
            "chargePerHour" : chargePerHour
        };

        console.log("Params : ",params);

        await collection.insertOne(params);
        return {
            statusCode : 200,
            body : "Library Added Successfully"
        }

    } catch (error) {
        console.error('Error:', error.message);
        // throw error;
        return{
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

module.exports = addLibrary;

// addLibrary().then((res) => {
//     if (res) {
//         console.log(res)
//     }
// })


