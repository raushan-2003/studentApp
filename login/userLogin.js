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
        let password = req.password.toLowerCase();
        
        let data = await collection.findOne({
            "email" : email
        });

        if (data) {

            if(password == data.password.toLowerCase()){
                return{
                    statusCode : 200,
                    body : "Login Sucess"
                }
            }
            return{
                statusCode : 400,
                body : "Invalid Credintial"
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
            console.log("Monogo Connection closing");
            await client.close();
            console.log("Monogo Collection close");
        }

    }
}

module.exports = checkUser;
