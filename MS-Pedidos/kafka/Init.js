const kafka = require('kafka-node');
const Order = require('../models/orders');
const client = new kafka.KafkaClient({kafkaHost: "kafka:9092"});

client.createTopics( [{ topic: 'setStateOrder', paritions: 5 ,  replicationFactor: 2 }],(err,result)=>{
    if(err) console.log("ERROR AL CREAR TOPICS");
    else console.log(result);
});

const consumer = new kafka.Consumer(client, [ {topic: 'setStateOrder'}]);

consumer.on('message',(orderChange)=>{
    var data = JSON.stringify(orderChange);
    Order.findOneAndUpdate({'_id':data.orderId},{'state': data.state},(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
})
