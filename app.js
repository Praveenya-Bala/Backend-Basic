const express = require('express')

const controller=require('./controller')
const app = express()
app.use(express.json())

app.post('/insert', controller.insertdata)
app.get('/getallstudent', controller.getAllStudent)
app.get('/getstudentbyrollno',controller.getStudentByRollNo)
app.delete('/deletestudent',controller.deleteStudent)
app.put('/editstudent',controller.editStudent)

app.get('/paramscheck/:id',(req,res)=>{
    console.log(req.params.id);
    res.send("Params Checked")
})

app.get('/querycheck',(req,res)=>{
    console.log(req.query);
    res.send("Query Params Checked")
})
//http://localhost:3000/querycheck?name=pravi&dept=CSE

app.listen(3000)