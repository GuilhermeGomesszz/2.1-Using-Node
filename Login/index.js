import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
const app = express();
const port = 30000
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const userDataBase = []

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

app.post("/register",async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(401).send({message:"Email e senha obrigatorios"})
    }
    const user = userDataBase.find(user => user.email  === email);
    if(user){
        return res.status(409).send({message: "Este email ja foi registrado"})
    }

    const salts = 10
    const hashedPassword = await bcrypt.hash(password, salts)

    userDataBase.push({email, password: hashedPassword});
    res.status(201).send({message:"Usuario criado com sucesso!"})

    sal = 10
    hash
})


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

  
    if (!email || !password) {
        return res.status(400).send({ message: "Email e senha são obrigatórios" });
    }

    
    const user = userDataBase.find(user => user.email === email);

    if (!user) {
        return res.status(401).send({ message: "Credenciais inválidas" });
    }


    const match = await bcrypt.compare(password, user.password);

    if (match) {
        res.status(200).send({message:"Login bem sucessido!"});
    } else {
        res.status(401).send({ message: "Senha incorreta" });
    }
});

   

app.listen(port,()=>{
    console.log("Server runing on porte 3000")
});