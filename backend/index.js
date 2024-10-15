import express, { response } from "express"
import { port} from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import {Book} from './models/bookModel.js';
import bookRoutes from './routes/bookRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const app=express()
app.use(express.json());
app.use(cors());
app.get('/',(request,response)=>{
console.log(request)
return response.status(234).send(`<h1>Welcome to MERN stack</h1>`);
})
app.listen(process.env.PORT ||port,()=>{
console.log('App is connected')
})
app.use('/books',bookRoutes);
const url=process.env.mongourl;
// mongoose.set('debug', true);
mongoose.connect(url)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error',err));




