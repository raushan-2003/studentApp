const storeOtp = require('./storeOtp');
const checkUser = require('./checkUser');

async function main(req) {
    try {
        // Destructuring email and name from the request object
        let { email, name, phone, password } = req;
        email = email.toLowerCase();

        // Validating if email and name are provided
        if (!email || !name || email.trim() === "" || name.trim() === "" || !phone || !password) {
            return {
                statusCode: 400,
                body: "Invalid Request: Name, Email, Phone and Password are required."
            };
        }

        let check = await checkUser(email);
        console.log("check : ",check);
        if(!check){
            return{
                statusCode : 400,
                body : "User Alredy exist with this email Id"
            }
        }

        // Storing OTP
        const result = await storeOtp(name, email,phone,password);
        console.log(result);

        // Checking if OTP was stored successfully
        if (result) {
            return {
                statusCode: 200,
                body: "OTP stored successfully."
            };
        }

        // If OTP storage failed
        return {
            statusCode: 500,
            body: "Failed to store OTP."
        };
    } catch (error) {
        console.error('Error:', error.message);
        return {
            statusCode: 500,
            body: error.message
        };
    }
}

module.exports = main;