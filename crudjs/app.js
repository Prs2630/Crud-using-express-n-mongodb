const express = require('express')
const app = express()
const port = process.env.PORT || 9090
const User = require("./models/user")
app.use(express.json())//middleware to parse the body
app.set('view engine', 'ejs')//to show ejs data
// const port = 3000
//routes creation
//get request
app.get("/api/get",(req,res)=>{
    User.find().then(data=>{
         res.json({message:"success", data:data});
        //  console.log("data arrived---",data)

    }).catch(err=>{
        console.log(err)
    })
    
})
//post request
app.post('/api/post', (req, res) => {
  const body = req.body;
  console.log(body)
  const user = new User({
    name: body.name,
    active: body.active
  })
  user.save().then(data => {
    res.json({ message: "user has been created", data: data })
  })
})

//put request
app.put("/api/update/:uid?",(req,res)=>{
    const id=req.params.uid;  //adding question mark will make it optional
    const body=req.body;
    User.updateOne({_id:id},{$set:{name:body.name}}).then(data=>{
        res.json({message:"update success",data:data})
    }).catch(err=>{
        res.json({message:"error",data:err})
    })

})
//delete request
app.delete("/api/delete/:id",(req,res)=>{
    const id=req.params.id;
    User.deleteOne({_id:id}).then(data=>{
        res.json({message:"delete success",data:data})

    }).catch(err=>{
        res.json({message:"err",data:data})

    })
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodejs').then(data => {
  console.log("db connected successfully")
}).catch(err => {
  console.log(err)
})



app.listen(port, () => {
  console.log(`server running at port ${port}`)
})