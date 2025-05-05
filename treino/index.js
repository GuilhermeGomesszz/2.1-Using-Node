import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compra from "./compra.js"
import bodyParser from "body-parser";

dotenv.config();


const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo connect")
    }catch (error) {
        console.log("Mongo não conectado")
    }
};

connectDb();

const app = express();
const port = 3000;


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.json({message:"Olá"})
});


app.get("/carrinho", async (req,res)=>{
    const novaVenda = await compra.find()
    if(!novaVenda){
        res.status(401).json({message:"Error"})
    }else{
        res.json(novaVenda)
    }
});


app.post("/comprar", async (req, res)=>{
    const vendaMensal = await compra.create(req.body)
    if(!vendaMensal){
        res.status(401).json({message:"Error"})
    }else{
        res.json(vendaMensal)
    }
    
});

app.put("/trocar/:id",async (req,res)=>{
    const troca = await compra.findByIdAndUpdate(req.params.id, req.body,{new: true})
    if(!troca){
        res.status(401).json({message:"Erro em atualizar sua compra"})
    }else{
        res.json(troca)
    }
});

app.delete("/devolver/:id",async  (req,res)=>{
    const apagar = await compra.findByIdAndDelete(req.params.id)
    if(!apagar){
        res.status(404).json({message:"Erro"})
    }else{
        res.json(apagar)
    }
})

app.listen(port, ()=>{
    console.log("Server is running on port 3000")
})