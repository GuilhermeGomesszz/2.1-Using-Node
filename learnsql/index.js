import express from "express";
import pg from "pg";
import bodyParser from "body-parser";





const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "123456",
    port: 5432,
});



const app = express();
const PORT = 3000;

db.connect();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/capitals", async (req, res)=>{
    const read = await db.query("SELECT * FROM capitals")
    if (!read){
        res.status(201).json({message:"error"})
    }else{
        res.json(read.rows)
    }
});

app.post("/newCoutry", async (req,res)=>{
    const {country, capital} = req.body;
    const query = 'INSERT INTO capitals (country, capital) VALUES (Gui, Lesme)';

    const values = [country, capital]

    db.query(query, values, (err, result)=>{
        if(err){
            res.status(401).json({message: "error ao adicionar pais"})
        }else{
            res.json(result)
        }
    })
});
app.listen(PORT,(req,res)=>{
    console.log("Server is running on port 3000;")
});