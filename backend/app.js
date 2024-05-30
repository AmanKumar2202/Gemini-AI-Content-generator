require("dotenv").config();
const express = require('express')
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");


//Instance of express
const app =express();

//Middlewares
const corsOptions = {
    origin:["http://localhost:5174","http://localhost:5173"],
}
app.use(express.json());
app.use(cors(corsOptions));
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//generate content route
app.post("/generate",async(req,res)=>{
    const {prompt} = req.body;
    try {
        
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});          
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            res.send(text);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to generate content");
    }
})



//Start the server
app.listen(8080,console.log("Server is running"));