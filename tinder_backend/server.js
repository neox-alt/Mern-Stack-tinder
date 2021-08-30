import express from "express";
import mongoose from "mongoose";
import Cors from "Cors";

import Cards from "./dbcard.js";


//app config
const app=express();
const port = process.env.PORT || 5000;
const connection_URL='mongodb+srv://admin:sCTJ4Vh2e5qiJcG@cluster0.i9x1z.mongodb.net/tinderdb?retryWrites=true&w=majority'


//middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const connection= mongoose.connection;
    connection.once("open", ()=>{
    console.log("mongoDB connection successfull")
})


//API endpoints
app.get("/",(req,res)=>
    res.status(200).send("hello clever programmer")
);

app.post("/tinder/cards",(req,res)=>{
    const dbcard=req.body;
    Cards.create(dbcard,(err,data)=>{
        if(err){
            res.status(200).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

//retriewing every thing in that collection

app.get("/tinder/cards",(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })

})

//Listeners
app.listen(port,()=>console.log(`listening on localhost:${port}`));