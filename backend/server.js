// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.route.js"; 
// import messageRoutes from "./routes/message.routes.js"; 
// import userRoutes from "./routes/user.routes.js"; 

// import connectToMongoDB from "./db/conectToMongoDB.js";

// const app =express();
// const PORT = process.env.PORT || 5000;

// dotenv.config();

// app.use(express.json({ limit: '20mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// app.use(express.json()); //parse inncoming req with json payloads 
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);


// app.get("/", (req, res)=> {
//     res.send("Hello World!!");
// });


// app.listen(PORT,()=>{
//     connectToMongoDB();
//     console.log(`Server is running in port number ${PORT}`);
// } );





import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"; 
import messageRoutes from "./routes/message.routes.js"; 
import userRoutes from "./routes/user.routes.js"; 

import connectToMongoDB from "./db/conectToMongoDB.js";

import axios from "axios";

const app =express();

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json()); //parse inncoming req with json payloads 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);




app.get("/api/pexels/:page", async (req, res) => {
    const { page } = req.params;
    try {
        const response = await fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=10`, {
            headers: {
                Authorization: `Bearer ${process.env.PEXELS_API_KEY}`,
            },
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from Pexels API' });
    }
});





app.get("/", (req, res)=> {
    res.send("Hello World!!");
});


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running in port number ${PORT}`);
} );





