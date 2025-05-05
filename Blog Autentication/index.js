import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
const app = express();

const port = 3000;

app.use(express.json());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const dataBase = []

app.get("/",(req, res)=>{
    res.render("index.ejs")
})

app.post("/register",async (req,res)=>{
    const username = req.body["new-username"];
    const email = req.body["new-email"];
    const password = req.body["new-password"];

    if(!email || !username || !password){
        res.status(401).json({message:"Campos não preenchidos"})
    }
    
    const user = dataBase.find(user => user.email === email);
    if(user){
        res.status(409).json({message:"Email já cadastrado"})
    }
    
    const hashed = await bcrypt.hash(password, 10)
    dataBase.push({email, username, password: hashed})
    res.status(201).json({message:"Usuario criado com sucesso"})
})


app.post("/login",async (req,res)=>{
    const name = req.body.username;
    const password = req.body.password
    if(!name || !password){
        res.status(401).json({message:"Erro! campos não preenchidos"})
    }
    const user = dataBase.find(user => user.name === name)

    if(!user){
        res.status(401).json({message:"Credenciais invalidas"})
    }

    const match = await bcrypt.compare(password, user.password)
    if(match){
        res.status(201).json({message:"Login bem sucedido"})
    }else{
        res.status(401).json({message:"Senha invalida"})
    }
});



app.listen(port,()=>{
    console.log("Server Runing on port 3000")
});