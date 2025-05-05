import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";
import e from "express";
const app = express();

const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


const userDataBase = [] 

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

// Rota para obter os itens do carrinho
app.get('/get-cart', (req, res) => {
    res.json({ cart: userDataBase });
});

app.post("/add-to-cart", (req, res) => {
        const {productName, quantity} = req.body;
        if (!productName || !quantity) {
            return res.status(400).json({ error: "Produto e preço são obrigatorios" });
        }
        const produto = userDataBase.find((produto) => produto.productName == productName);
        if (!produto) {
            return res.status(404).json({ error: "Produto not found" });
        }else{
            const addedProduct = userDataBase.push({productName, quantity});
            if (!addedProduct) {
                return res.status(500).json({ error: "Failed to add product to cart" });
            }
        res.status(200).json({ message: "Produto added to cart", produto: addedProduct });
        }

        
    })


    app.put("/update-product", (req, res) => {
        const {productName, quantity} = req.body;
        if (!productName || !quantity) {
            return res.status(400).json({ error: "Produto e preço são obrigatorios" });
        }
        const produto = userDataBase.find((produto) => produto.productName == productName);
        if (!produto) {
            return res.status(404).json({ error: "Produto not found" });
        }else{
            const updatedProduct = userDataBase.push({productName, quantity});
            if (!updatedProduct) {
                return res.status(500).json({ error: "Failed to update product in cart" });
            }
        res.status(200).json({ message: "Produto updated in cart", produto: updatedProduct });
        }

        
    })

    app.delete("/delete-product", (req, res) => {
        const { productName } = req.body;
        const index = userDataBase.findIndex((produto) => produto.productName === productName);
        if (index === -1) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        userDataBase.splice(index, 1); // Remove o produto do array
        res.json({ success: true, message: "Produto deletado com sucesso" });
    });

        
   

app.listen(port,()=>{
    console.log("Server runing on port 3000")
});