const express=require('express');
const { write } = require('fs');

const server = express();
server.use(express.json());

const PORT=8080;
const readJson=() =>{
    const data = fs.readFileSync("db.json","utf8");
    return JSON.parse(data);
}
const writeJson = (data) =>{
    fs.writeFileSync("./db.json",JSON.stringify(data,null,2))
}
server.get("/todos",(req,res) =>{
    const data = readJson();
    res.send(data);


});

server.post("/todos",(req,res) =>{
    const data = readJson();

    const newTask= {
        id:data.todos.length + 1,
        task:req.body.task,
        status : false

    };
    data.todos.push(newTask);
    writeJson(data)
    res.json(newTask)

})
    server.put("/todos/update",(req,res) =>{
        const data = readJson()
        data.todos.forEach(todo => {
            if(todo.id %2 ==0 && todo.status==false){
                todo.status=true
            }
        });
        writeJson(data);
        res.json(data.todos)
    })

server.listen(PORT,()=>{
    console.log(`listening on port${PORT}`)
})
