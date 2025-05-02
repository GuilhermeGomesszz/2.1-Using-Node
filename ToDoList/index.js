import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const tasks = []


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index.ejs")
});

app.post("/add-todo",(req, res)=>{
    const newTask = req.body.task;
    if (!newTask){
        return res.status(400).send("Tarefa não enviada");
    }

    tasks.push({id: tasks.length + 1, text: newTask});

    res.status(201).json({ message: "Tarefa adicionada com sucesso", task: newTask });
    
});


app.patch("/edit-todo/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const newText = req.body.text;

    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = newText;
        res.status(200).json({ message: "Tarefa atualizada", task });
      } else {
        res.status(404).json({ message: "Tarefa não encontrada" });
      }
});

app.delete("/delete-task/:id", (req,res)=>{
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex((task)=> task.id === taskId);

    if (index !== -1) { 
        tasks.splice(index, 1);
        res.status(200).send("Tarefa removida")

    }else {
        res.satus(404).send("Tarefa não encontrada")
    }
});

app.listen(port,()=>{
    console.log("Server Running on port 3000")
})