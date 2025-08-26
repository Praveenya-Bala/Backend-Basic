const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("DB Connection Error", err))

const studentschema = new mongoose.Schema({
    rollno: String,
    name: String,
    age: Number,
    department: String
})
const student = mongoose.model("student", studentschema)

app.post('/insert',async(req,res)=>{
    const {rollno,name,age,department}=req.body
    const newstudent=new student({rollno,name,age,department})
    try{
        await newstudent.save()
        res.status(201).send("Student inserted")
    }catch(Error){
        res.status(400).send("Error inserting student")
    }
})

app.get('/getallstudent',async(req,res)=>{
    try{
        const data=await student.find()
        res.send(data)
    }catch(error){
        res.status(500).send("Error fetching students")
    }
})

app.get('/getstudentbyrollno',async(req,res)=>{
    try{
        const {rollno} = req.body
        const data=await student.findOne({rollno})
        if(data){
            res.send(data)
        }else{
            res.status(404).send("Student not found")
        }
    }catch(error){
        res.status(500).send("Error fetching students")
    }
})

// app.delete('/deletestudent',async(req,res)=>{
//     try{
//         const {rollno} = req.body
//         const count=await student.deleteOne({rollno})
//         if(count.deletedCount>0){
//             res.send("Student deleted")
//         }else{
//             res.status(404).send("Student not found")
//         }
//     }catch(error){
//         res.status(500).send("Error deleting students")
//     }
// })

app.delete('/deletestudent',async(req,res)=>{
    try{
        const {rollno} = req.body
        const deleteddata=await student.findOneAndDelete({rollno})
        if(deleteddata){
            res.send("Student deleted")
        }else{
            res.status(404).send("Student not found")
        }
    }catch(error){
        res.status(500).send("Error deleting students")
    }
})

app.get('/getstudentbyparams/:rollno',async(req,res)=>{
    try{
        const {rollno} = req.params
        const data=await student.findOne({rollno})
        if(data){
            res.send(data)
        }else{
            res.status(404).send("Student not found")
        }
    }catch(error){
        res.status(500).send("Error fetching students")
    }
})

app.get('/getstudentbyquery',async(req,res)=>{
    try{
        const {rollno} = req.query
        const data=await student.findOne({rollno})
        if(data){
            res.send(data)
        }else{
            res.status(404).send("Student not found")
        }
    }catch(error){
        res.status(500).send("Error fetching students")
    }
})

app.listen(3000)