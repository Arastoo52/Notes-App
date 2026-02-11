const cors = require("cors")

const express = require("express")

const noteModel = require("../src/models/notes.model")

const app = express()

app.use(express.json())
app.use(express.static("./public"))
app.use(cors());
const path=require("path")




app.post("/notes",async(req,res)=>{
    const  {title,description}=req.body

    const note = await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message:"Note created sucessfully",
        note
    })

})


app.get("/notes",async(req,res)=>{

    const notes = await noteModel.find()

    res.status(201).json({

        message:"notes fetched sucessfully",
        notes

    })



})





app.delete("/notes/:id",async(req,res)=>{
    const id=req.params.id

    const notes= await noteModel.findByIdAndDelete(id)


    res.status(200).json({
        message:"note deleted sucessfully"

    })

})



app.patch("/notes/:id",async(req,res)=>{
     const id = req.params.id
     const {description}=req.body

      await noteModel.findByIdAndUpdate(id,{description})


     res.status(200).json({
        message:"descriptipn updatde sucessfully"
     })




})




app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..", "/public/index.html"))
})


module.exports = app






