var express = require('express');
var jwt = require('jsonwebtoken');
var Order = require("./models/orders")
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

app.get("/Orders",(req,res)=>{
    Order.find({},(err,result)=>{
        if(err) console.log("Error al intentar acceder a lista");
        res.send(result);
    })
})

app.post("/Order/add",(req,res)=>{
    var newOrder = new Order();
    newOrder.table = req.body.table;
    newOrder.state = "Pedido"
    newOrder.dishId = req.body.dishId;

    newOrder.save((err,orderRegisted)=>{
        if(err)return res.status(500).send("ERROR AL GUARDAR REGISTRO");
        return res.status(200).send(orderRegisted);
    });

})

app.listen(port,()=>{
    console.log("Sevidor corriendo en puerto: " + port);
});