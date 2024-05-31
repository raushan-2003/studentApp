const express = require('express');
const app = express();

const signUp = require('./signUp/index');
const login = require('./login/userLogin');
const verify = require('./verifyOtp/index');
const userProfile = require('./userProfile/profile');

const allMesh = require("./Mesh/all_mesh");
const addMesh = require('./Mesh/add_mesh');
const getMesh = require('./Mesh/particular_mesh');

const alllodge = require('./Laudge/all_laudge');
const addlodge = require('./Laudge/add_laudge');
const getlodge = require('./Laudge/particular_laudge');

const allLibrary = require('./Liibrary/all_library');
const addLibrary = require('./Liibrary/add_library');
const getLibrary = require('./Liibrary/particular_library');


const port = 3000;

app.use(express.json());

app.post('/signUp', async (req, res) => {
    try {
        console.log(req.body); // Access request body using req.body
        const data = await signUp(req.body);

        res.status(data.statusCode).json(data.body);
    } catch (e) {
        res.status(500).send({ body: e.message });
    } 
});

app.post('/verifyOtp', async (req, res) => {
    try {
        console.log("Verify Request : ", req.body);
        const data = await verify(req.body);  

        res.status(data.statusCode).json(data.body); 
    } catch (e) {
        res.status(500).send({ body: e.message });
    }
}); 

app.post('/login', async (req, res) => {
    try {
        console.log("Login Request : ", req.body);
        const data = await login(req.body);  

        res.status(data.statusCode).json(data.body); 
    } catch (e) {
        res.status(500).send({ body: e.message });
    }
}); 

app.post('/userProfile', async (req, res) => {
    try {
        const data = await userProfile(req.body);  

        res.status(data.statusCode).json(data.body); 
    } catch (e) {
        res.status(500).send({ body: e.message });
    }
}); 


app.get('/getMesh', async(req,res) =>{
    try{
        let data = await allMesh();
        res.status(data.statusCode).json(data.body);
    }catch(e){
        res.status(500).json(e.message);
    }
    
})

app.post('/addMesh', async(req,res) =>{
    try{
        console.log("Request Body : ",req.body);
        let meshData = await addMesh(req.body);
        res.status(meshData.statusCode).json(meshData.body);

    }catch(e){
        res.status(500).json(e.message);
    }

})

app.get('/getLodge', async(req,res) =>{
    try{
        let data = await alllodge();
        res.status(data.statusCode).json(data.body);
    }catch(e){
        res.status(500).json(e.message);
    }
    
})

app.post('/addLodge', async(req,res) =>{
    try{
        console.log("Request Body : ",req.body);
        let meshData = await addlodge(req.body);
        res.status(meshData.statusCode).json(meshData.body);

    }catch(e){
        res.status(500).json(e.message);
    }

})

app.post('/getParticularMesh', async(req,res) =>{
    try{
        console.log("Request Body : ",req.body);
        let data = await getMesh(req.body.meshName);
        res.status(data.statusCode).json(data.body);

    }catch(e){
        res.status(500).json(e.message);
    }

})

app.post('/getParticularLodge', async(req,res) =>{
    try{
        console.log("Request Body : ",req.body);
        let data = await getlodge(req.body.lodgeName);
        res.status(data.statusCode).json(data.body);

    }catch(e){
        res.status(500).json(e.message);
    }

})

app.get('/getLibrary', async(req,res) =>{
    try{
        let data = await allLibrary();
        res.status(data.statusCode).json(data.body);
    }catch(e){
        res.status(500).json(e.message);
    }
    
})

app.post('/addLibrary', async(req,res) =>{
    try{
        console.log("Request Body : ",req.body);
        let meshData = await addLibrary(req.body);
        res.status(meshData.statusCode).json(meshData.body);

    }catch(e){
        res.status(500).json(e.message);
    }

})

app.post('/getParticularLibrary', async(req,res) =>{
    try{
        console.log("Request Body : ",req.body);
        let data = await getLibrary(req.body.libraryName);
        res.status(data.statusCode).json(data.body);

    }catch(e){
        res.status(500).json(e.message);
    }

})

console.log("Port : ",port);

app.listen(port, () => {
    console.log(`Server is running onn port ${port}`);
})
