import Express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

import credentials from "./middlewares/credentials.js";
import connectDB from "./config/DBconn.js"
import userRoute from './routes/userRoutes.js'
import articleRoute from './routes/articleRoutes.js'
import categoryRoute from './routes/categoryRoutes.js'
import { verifyJWT } from "./middlewares/verifyJWT.js";
dotenv.config();

//connect to db
connectDB();
const app = Express();

app.use(credentials);
//cross origin Ressource sharing
app.use(cors(corsOptions));
//built in middleware for to handle urlencoded form data
app.use(Express.urlencoded({extended:true}));
//built in middleware for json
app.use(Express.json());

//middleware for cookies
app.use(cookieParser());


//serve static files
// app.use(Express.static('public'))  uncomment this when a public folder is needed
// mongoose.set('strictQuery', false);

app.use('/api/users',userRoute);

// app.use(verifyJWT);
app.use('/api/categories',categoryRoute);
app.use('/api/articles',articleRoute);
// app.use('/api/users',userRoutes);
// app.use('/api/admins',adminRoutes)
mongoose.connection.once('open',()=>{
app.listen(process.env.PORT, ()=>{console.log(`http://localhost:${process.env.PORT}`)});
})
