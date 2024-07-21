require('dotenv').config();
const connectToDb = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.USERTABLE;

async function updateUserProfile(req) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        const event = req;
        console.log("Function Accept Request:", event);

        // Extract details from the event
        const email = event.email;
        const name = event.name;
        const phone = event.phone;

        if (!email) {
            throw new Error("Email is required for updating user profile");
        }

        const filter = { email: email };
        const updateDoc = {
            $set: {
                name: name,
                phone: phone,
                email: email // Using the same email for updating
            }
        };

        console.log("Filter:", filter);
        console.log("Update Document:", updateDoc);

        const result = await collection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
            throw new Error(`No user found with email: ${email}`);
        }

        console.log(`Successfully updated user profile for ${email}`);
        return {
            statusCode: 200,
            body: "Successfully updated user profile"
        };
    } catch (error) {
        console.error('Error:', error.message);
        return {
            statusCode: 500,
            body: `Error updating user profile: ${error.message}`
        };
    } finally {
        if (client) {
            console.log("MongoDB Connection closing");
            await client.close();
            console.log("MongoDB Connection closed");
        }
    }
}

module.exports = updateUserProfile;
