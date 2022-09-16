import { config } from "./dbconfig.js";
import express, { request, response }  from "express";
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

app.put('/updateyear/:id/:year',(request,response)=>{
    const {id,year} = request.params
    db.query('UPDATE books SET year=? where id=?',[year,id],(err,result)=>{
        if(err)
            console.log(err)
        if(result.affectedRows==1)
            response.send({messege:"Sikeres adatmódosítás!"})
        else
            response.send({messege:"Sikertelen adatmódosítás!"})
    })
})

app.put('/',(request,response)=>{
    const {id,kat} = request.body
    db.query('UPDATE books SET category=? where id=?',[kat,id],(err,result)=>{
        if(err)
            console.log(err)
        if(result.affectedRows==1)
            response.send({messege:"Sikeres adatmódosítás!"})
        else
            response.send({messege:"Sikertelen adatmódosítás!"})
    })
})

app.post('/',(request,response)=>{
    const {author,title,year,category} = request.body
    db.query('INSERT INTO books VALUES (null,?,?,?,?)',[author,title,year,category],(err,result)=>{
        if(err)
            console.log(err)
        if(result.insertId)
            response.send({messege:`Sikeres adatmódosítás! ID: ${result.insertId}`})
        else
            response.send({messege:"Sikertelen adatmódosítás!"})
    })
})

app.delete('/',(request,response)=>{
    const {id} = request.body
    db.query('DELETE from books where id=?;',[id],(err,result)=>{
        if(err)
            console.log(err)
        if(result.affectedRows)
            response.send({messege:`Sikeres adatmódosítás!`})
        else
            response.send({messege:"Sikertelen adatmódosítás!"})
    })
})

app.get('/kategoria/:category',(request,response)=>{
    const {category} = request.params
    db.query('SELECT author,title from books where category=?',[category],(err,result)=>{
        if(err)
            console.log(err)
        else    
            response.send(result)
    })
})


app.listen(5000,()=>console.log('server on port 5000...'))