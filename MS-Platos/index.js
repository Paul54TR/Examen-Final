var express = require('express');
var bodyParse = require('body-parser');
var jwt = require('jsonwebtoken');
var Dish = require("./models/dish");
var app = express();
var port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())  

app.get("/getJwt",(req,res)=>{
    let token = jwt.sign({"body" : "stuff"},"Word Secret",{algorithm: 'HS256'});
    res.send({token: token});
})

app.get("/Dishes",(req,res)=>{
    Dish.find({},(err,result)=>{
        if(err) console.log("Error al intentar acceder a lista");
        res.send(result);
    })
})

app.post("/Dish/add",(req,res)=>{
    var newDish = new Dish();
    newDish.price = req.body.price;
    newDish.name = req.body.name;
    newDish.state = "Disponible";
    newDish.save((err,dishRegisted)=>{
        if(err)return res.status(500).send("ERROR AL GUARDAR REGISTRO");
        return res.status(200).send(dishRegisted);
    });
})

app.listen(port,()=>{
    console.log("Sevidor corriendo en puerto: " + port);
});