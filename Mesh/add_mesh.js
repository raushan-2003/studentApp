require('dotenv').config();
const connectToDb = require('../config/mongoConnection');


const database = process.env.DATABASE;
const collectionName = process.env.MESHTABLE;

async function addMesh(req) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        let data = req;

        if(!data.meshName || !data.address || !data.contactInfo || !data.menu || !data.price){
            return {
                statusCode : 400,
                body : "Invalid Request : MeshName, Address, ContactInfo, Menu And Price are Required" 
            }
        }

        let params = {
            "meshName": data.meshName,
            "address": data.address,
            "contactInfo": data.contactInfo,
            "menu": data.menu,
            "price": data.price
        };

        await collection.insertOne(params);
        // console.log("Mesh Added Successfully ",params);

        return {
            statusCode : 200,
            body : "Mesh Added Successfully"
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

module.exports = addMesh;

// addMesh().then((res) => {
//     if (res) {
//         console.log(res)
//     }
// })



// let data = {
//     "meshId": "mesh456",
//     "meshName": "Morning Glory Cafe",
//     "address": "456 Sunrise Boulevard, Sunnyville",
//     "contactInfo": "789-123-4567",
//     "menu": [
//         {
//             "day": "Monday",
//             "times": {
//                 "Breakfast": ["Pancakes", "Scrambled Eggs", "Orange Juice"],
//                 "Lunch": ["Grilled Cheese Sandwich", "Tomato Soup", "Iced Tea"],
//                 "Dinner": ["Spaghetti Carbonara", "Caesar Salad", "Lemonade"]
//             }
//         },
//         {
//             "day": "Tuesday",
//             "times": {
//                 "Breakfast": ["French Toast", "Sausage Links", "Coffee"],
//                 "Lunch": ["Chicken Caesar Wrap", "Chips", "Fruit Smoothie"],
//                 "Dinner": ["Beef Stir Fry", "Steamed Rice", "Green Tea"]
//             }
//         },
//         {
//             "day": "Wednesday",
//             "times": {
//                 "Breakfast": ["Bagel with Cream Cheese", "Fruit Bowl", "Cappuccino"],
//                 "Lunch": ["Turkey Club Sandwich", "Sweet Potato Fries", "Milkshake"],
//                 "Dinner": ["Grilled Salmon", "Roasted Vegetables", "Sparkling Water"]
//             }
//         },
//         {
//             "day": "Thursday",
//             "times": {
//                 "Breakfast": ["Yogurt Parfait", "Granola", "Mango Smoothie"],
//                 "Lunch": ["Vegetable Soup", "Garlic Bread", "Iced Coffee"],
//                 "Dinner": ["Shrimp Scampi", "Angel Hair Pasta", "White Wine"]
//             }
//         },
//         {
//             "day": "Friday",
//             "times": {
//                 "Breakfast": ["Egg and Cheese Croissant", "Hash Browns", "Mocha"],
//                 "Lunch": ["Caprese Salad", "Crusty Bread", "Fresh Lemonade"],
//                 "Dinner": ["BBQ Pork Ribs", "Corn on the Cob", "Craft Beer"]
//             }
//         },
//         {
//             "day": "Saturday",
//             "times": {
//                 "Breakfast": ["Waffles", "Berries", "Whipped Cream"],
//                 "Lunch": ["Falafel Plate", "Hummus", "Pita Bread"],
//                 "Dinner": ["Prime Rib", "Baked Potato", "Red Wine"]
//             }
//         },
//         {
//             "day": "Sunday",
//             "times": {
//                 "Breakfast": ["Omelette", "Toast", "Freshly Squeezed Orange Juice"],
//                 "Lunch": ["Caesar Salad", "Soup of the Day", "Iced Tea"],
//                 "Dinner": ["Chicken Marsala", "Garlic Mashed Potatoes", "Chardonnay"]
//             }
//         }
//     ],
//     "price" : 2200

// }