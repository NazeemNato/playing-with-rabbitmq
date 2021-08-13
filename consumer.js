const amqp = require("amqplib");

 
const connect = async () => {
  try {
    const connection = await amqp.connect("amqps://nlyefrse:tJo_t_6A32QUP3785I5zKTo-ZP74OTrM@puffin.rmq2.cloudamqp.com/nlyefrse");
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs")

    channel.consume("jobs", message => {
       const input = JSON.parse(message.content.toString());
       console.log(`Received job with input ${input.message}`)
       if(input.message == 4){
           channel.ack(message)
       }
    })
    console.log("Waiting for messages....");


} catch (error) {
    console.error(error);
  }
};

connect();