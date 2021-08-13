const amqp = require("amqplib");

const msg = {
    message: process.argv[2]
}

const connect = async () => {
  try {
    const connection = await amqp.connect("amqps://nlyefrse:tJo_t_6A32QUP3785I5zKTo-ZP74OTrM@puffin.rmq2.cloudamqp.com/nlyefrse");
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs")
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
    console.log(`Job sent successfully ${msg.message}`)
    await channel.close();
    await connection.close();
} catch (error) {
    console.error(error);
  }
};

connect();