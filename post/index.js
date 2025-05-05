import express from "express";
import bodyParser from "body-parser";
import {randomBytes} from "crypto";
import cors from "cors";
import posts from "./posts.js"
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();
const app = express();

const PORT= 3000;

const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("mongo conectado com sucesso");
    } catch (error) {
      console.error("ERROR connecting to MongoDB:", error);
    }
  };


connectDb();


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.post("/post"
app.listen(PORT,()=>{
    console.log("server is runing on port 3000")
});