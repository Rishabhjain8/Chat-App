const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const socket = require('socket.io');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const path = require("path");

connectToMongo();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/message', require('./routes/message'));

__dirname = path.resolve();

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,'/chatapp/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'chatapp', 'build', 'index.html'));
    })
}

const server = app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
})

const io = socket(server, {
    cors:{
        origin: process.env.host,
        credentials: true
    }
});

global.onlineUsers = new Map();       //store our all online users

io.on("connection", (socket) => {
    global.chatSocket = socket;        //store the socket in globalChatSocket
    socket.on("add-user", (userId) => {    //when we emit add-user from frontend when the user is logged in it will establlish a socket connection grab userId,current socket.id set inside the map
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.message)
        }
    })
})