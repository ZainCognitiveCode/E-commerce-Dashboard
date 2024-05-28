const express= require('express')
require('./db/config')
const cors = require('cors')
const User = require("./db/User")
const app = express()
app.use(express.json()) //This line is very important to Save the Data into Database. it is as a middleware for the data
app.use(cors()) //as a middleware
const Product = require('./db/Product')



// SignUp API
app.post("/register",async(req,res)=>{
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject();
    delete result.password
    res.send(result)
   

})

// Login API
app.post("/login",async(req,res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
    if(user){ 
         res.send(user)
        }else{
            res.send({result:"No user found"})
        }

    }else{
        res.send("No user found")
    }
})


// PRODUCT API
app.post("/add-product",async(req,res)=>{
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)

})

// GET PRODUCT LIST API
app.get("/products",async(req,res)=>{
    let products = await Product.find()
    if(products.length>0){
        res.send(products)
    }
    else{
        res.send("No products Found")
    }
})



// DELETE PRODUCT API METHOD
app.delete("/product/:id",async(req,res)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

// Delete all API
app.delete("/product",async(req,res)=>{
    let result = await Product.deleteMany()
    res.send(result) 
})

// First getting the product to update it by API

app.get("/product/:id",async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send("No Record Found")
    }
})

// Update Product API
app.put("/product/:id",async(req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        { $set:req.body})
        res.send(result)

})

// Search Product API

app.get("/search/:key",async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {Company:{$regex:req.params.key}},
            {Category:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
        ]
    })
    res.send(result)

})




app.listen(5000)