import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware para processar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para gerar o nome da banda
function bandNameGenerator(req, res, next) {
  console.log(req.body);
  res.locals.bandName = req.body["street"] + req.body["pet"];
  next();
}

// Servir o HTML da página inicial
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Usar o middleware antes da rota POST
app.post("/submit", bandNameGenerator, (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${res.locals.bandName} ✌️</h2>`);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
