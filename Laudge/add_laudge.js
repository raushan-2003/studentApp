require('dotenv').config();
const connectToDb = require('../config/mongoConnection');


const database = process.env.DATABASE;
const collectionName = process.env.LAUDGETABLE;


// const event = {
//     "lodgeId": "lodge789",
//     "lodgeName": "Scholar's Shelter",
//     "address": "Korrah Chock, Hazaribagh",
//     "contactInfo": "987-654-3210",
//     "rent": 1300,
//     "facilities": ["Gym", "Library", "Laundry"],
//     "imageUrl": ["https://drive.google.com/file/d/1YtCALv6uSw-P0aH1jrOZo-oRsKBuruUJ/view?usp=drivesdk","https://drive.google.com/file/d/1YtSmgLX-rCHZWyW6_pJdwixg8Pe92kgN/view?usp=drivesdk"],
//     "lodgeType": "boys"
// }





async function addLodge(req) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        const event = req;

        // Extract details from the event
        const lodgeName = event.lodgeName;
        const address = event.address;
        const contactInfo = event.contactInfo;
        const rent = event.rent;
        const facilities = event.facilities;
        const lodgeType = event.lodgeType;
        const imageUrl = event.imageUrl;

        // Validation to check if essential fields are present
        if ( !lodgeName || !address || !contactInfo || !lodgeType) {
            return {
                statusCode: 400,
                body:  "Missing required fields: lodgeId, lodgeName, address, contactInfo and lodgeType" 
            };
        }

        let params = {
            "lodgeName": lodgeName,
            "address": address,
            "contactInfo": contactInfo,
            "facilities": facilities,
            "rent": rent,
            "lodgeType" : lodgeType,
            "imageUrl" : imageUrl
        };

        console.log("Params : ",params);

        await collection.insertOne(params);
        return {
            statusCode : 200,
            body : "Lodge Added Successfully"
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

module.exports = addLodge;

// addLodge().then((res) => {
//     if (res) {
//         console.log(res)
//     }
// })


