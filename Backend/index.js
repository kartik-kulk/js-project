const express = require("express");
const cors = require("cors")
require("./db/config");
const user= require('./db/GetUser');
const Product = require("./db/Product")

const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm';
const app = express();

app.use(express.json());
app.use(cors());


app.post("/Reg", async(req,resp)=>{
    let User = new user(req.body);
    let result = await User.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if (err){
            resp.send({result:"Something went wrong :(, Please try after some time"})
        }
            resp.send({result,authentication:token});
            
        })
})

app.post("/login", async (req,resp) =>{
    if (req.body.password && req.body.email){

    let User = await user.findOne(req.body).select("-password");
    if (User)
    {
        Jwt.sign({User},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if (err){
            resp.send({result:"Something went wrong :(, Please try after some time"})
        }
        
            resp.send({User,authentication:token});
            
        })
    }
    else{
        resp.send({result:"No user found"});
    }
    } else {resp.send({result:"Incorrect login details"})}
})

app.post("/add-product", verifyToken, async (req,resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/prods/:UserID", verifyToken, async (req,resp)=>{
    console.warn(req.params.UserID);
    let result = await Product.find({userID:req.params.UserID});
    console.warn(result)
    if (result)
    {
        resp.send(result)
    } else {
        resp.send({result:"No product found"})
    }
})



app.delete("/product/:id", verifyToken, async (req,resp)=>{
    let result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
})

app.get("/product/:id", verifyToken, async (req,resp)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        resp.send(result);
    } else{
        resp.send({result:"No Record Found"})
    }
})

app.put("/update/:id", verifyToken, async (req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result);
})

app.get("/search/:key/:UserID", verifyToken, async(req,resp)=>{
    let result = await Product.find({
        "$or":[
            {
                name:{$regex:req.params.key},
                userID:req.params.UserID
            },
            {
                price:{$regex:req.params.key},
                userID:req.params.UserID
            },
            {
                brand:{$regex:req.params.key},
                userID:req.params.UserID
            },
            {
                category:{$regex:req.params.key},
                userID:req.params.UserID
            }
        ]
    });
    resp.send(result);
})

function verifyToken(req,resp,next){
    console.warn(req.headers['authorization'])
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                resp.status(401).send('Please provide a valid token!')
            } else {
                next();
            }
        })
    }else{
        resp.status(403).send({result:'Please provide a token'})
    }
}


app.listen(5000);
