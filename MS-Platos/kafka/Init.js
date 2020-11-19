const kafka = require('kafka-node');
const Dish = require('../models/dish');
const client = new kafka.KafkaClient({kafkaHost: "kafka:9092"});
const producer = new kafka.Producer(client);

client.createTopics( [{ topic: 'setStateDish', paritions: 7 ,  replicationFactor: 3 }],(err,result)=>{
    if(err) console.log("ERROR AL CREAR TOPICS");
    else console.log(result);
});

const consumer = new kafka.Consumer(client, [ {topic: 'setStateDish'}]);

consumer.on('message',(dishChange)=>{
    var data = JSON.stringify(dishChange);
    dish.findOneAndUpdate({'_id':data.dishId},{'state': data.state},(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
})