import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import compra from "./compra.js";


const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
const PORT = 3000;


const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI); // Corrigido para MONGO_URI
      console.log("✅ MongoDB connected!");
    } catch (error) {
      console.error("❌ MongoDB connection error:", error.message);
      process.exit(1); // Encerra o processo com falha
    }
  };

connectDB();


app.get("/",(req, res)=>{
    res.status(201).json({message: "Hello word"})
});

app.post("/carrinho",async (req,res)=>{
    const novaVendaMensal = await compra.create(req.body);

    if(!novaVendaMensal){
        res.status(401).json({message:"error"})
    }else{
        res.json(novaVendaMensal);
    }

});


app.get("/vendas", async(req, res)=>{
    const vendaTotal = await compra.find()
    if(!vendaTotal){
        res.status(401).json({message: "error"})
    }else{
        res.json(vendaTotal)
    }
});

app.put("/vendas/:id", async (req, res)=>{
    const novaVenda = await compra.findByIdAndUpdate(req.params.id, req.body,{new: true});

    if(!novaVenda){
        res.status(401).json({message: "error"})
    }else{
        res.json(novaVenda)
    }
});

app.delete("/vendas/:id",async (req,res)=>{
    const apagar = await compra.findByIdAndDelete(req.params.id)
    if(!apagar){
        res.status(401).json({message:"error ao apagar produto"})
    }else{
        res.json(apagar)
    }
});


app.listen(PORT,()=>{
    console.log("Server is runing on port 3000:");
})