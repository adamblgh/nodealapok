import { config } from "./dbconfig.js";
import express  from "express";
import mysql from "mysql";

const app = express()
app.use(express.json())
const db=mysql.createConnection(config)

app.get('/',(request,response)=>{
    db.query('SELECT author FROM books GROUP BY author ORDER BY author;',(err,result)=>{
        if(err)
            console.log(err)
        else    
            response.send(result)
    })
})

app.get('/author/:author',(request,response)=>{
    const {author} = request.params
    db.query('SELECT title from books where author=? ORDER BY title;',[author],(err,result)=>{
        if(err)
            console.log(err)
        else    
            response.send(result)
    })
})

app.get('/kat/:kat/ev/:ev',(request,response)=>{
    const {kat,ev} = request.params
    db.query('SELECT * from books where year>=? and category like ?',[ev,kat],(err,result)=>{
        if(err)
            console.log(err)
        else    
            response.send(result)
    })
})

app.get('/id/:id',(request,response)=>{
    const {id} = request.params
    db.query('SELECT * FROM books where id=?',[id],(err,result)=>{
        if(err)
            console.log(err)
        else    
            response.send(result)
    })
})

app.listen(5000,()=>console.log('server on port 5000...'))