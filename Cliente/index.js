const express = require("express");
const kafka = require("kafka-node");
const app = express();
const port = 3000;
var request = require('request');
const client = new kafka.KafkaClient({kafkaHost: "kafka:9092"});
const producer = new kafka.Producer(client);
const api_gateway = "http://localhost:8080";


app.set("views",(__dirname+"/views"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render('index');
})

app.get("/orders",(req,res)=>{
   
    var options = {
        'method': 'GET',
        'url': api_gateway+'/Orders'
        };
    
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        if(response.body == "true" || response.body == true || response.body == 'true'){
            res.render('ordenes',{data: response.body});
        }else{
            res.send(false);
        }
        });

})


app.get("/dishes",(req,res)=>{
    var options = {
        'method': 'GET',
        'url': api_gateway+'/Dishes'
        };
    
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        if(response.body == "true" || response.body == true || response.body == 'true'){
            res.render('platos',{data: response.body});
        }else{
            res.send(false);
        }
        });
})

app.post("/order",(req,res)=>{
    var options = {
        'method': 'POST',
        'url': api_gateway+'/Order/add',
        'form': {
            'dishId': req.body.dishId,
            'table': req.body.table
        }
        };
    
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response);
        });
    
})

app.post("/dish",(req,res)=>{
    var options = {
        'method': 'POST',
        'url': api_gateway+'/Dish/add',
        'form': {
            'price': req.body.price,
            'name': req.body.name
        }
        };
    
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response);
        });
    
})

app.post("/order/state",(req,res)=>{
    producer.send([{topic: 'setOrderState' , messages: "{'name': 'Paul'}"}],(err,data)=>{
        if(err) console.log("ERROR AL ENVIAR MENSAJE");
        else console.log(data);
    });
})

app.post("/dish/state",(req,res)=>{
    producer.send([{topic: 'setDishState' , messages: "{'name': 'Paul'}"}],(err,data)=>{
        if(err) console.log("ERROR AL ENVIAR MENSAJE");
        else console.log(data);
    });
})

app.listen(port,()=>{
    console.log("Aplicación corriendo en puerto " + port);
})


