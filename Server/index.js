const express = require('express');
const mongoose = require('mongoose');
const app = express();
let http = require('http');
const { Server } = require('socket.io');
const amqp = require('amqplib/callback_api');
const cors = require('cors');
app.use(cors());
const route = require("./src/route");
app.use(express.json())

mongoose.connect("mongodb+srv://priyanka99:EorbzmKpqdV7ml9W@cluster0.puozp1a.mongodb.net/notificationUser", {
  useNewUrlParser: true
})

  .then(() => console.log("MongoDb is connected......."))
  .catch(err => console.log(err))

app.use('/', route);


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  }
})

io.on("connection", (socket) => {

  amqp.connect('amqp://localhost', (err0, connection) => {
    if (err0) {
      throw err0
    }

    connection.createChannel((err1, channel) => {
      if (err1) {
        throw err1
      }

      let queue = 'basicMarketing';
      channel.assertQueue(queue);

      socket.on("join_room", (data) => {
        socket.join(data);
      });

      socket.on("send_message", (data) => {
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))

        channel.consume(queue, (message) => {
          const data = JSON.parse(message.content.toString())
          if(data.room)socket.to(data.room).emit("receive_message", data);
        }, { noAck: true })

      })

    });
  })
})




server.listen(3001, () => {
  console.log("Server is Running on port 3001")
})