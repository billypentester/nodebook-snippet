const express = require('express')
const path = require('path')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket)=>{

    console.log("user connected with ID: " + socket.id);

    // send message to all clients

    socket.on("send", (text, room)=>{
        if(room == undefined){
            io.emit("receive", text);
        }
        else
        {
            io.to(room).emit("receive", text);
        }
    })

    // send message to all clients except the sender

    // socket.on("send", (msg)=>{
    //     socket.broadcast.emit("receive", msg);
    // })

    // send private message to single client

    socket.on("private", (room, text)=> {
        io.to(room).emit("receive", text);
    })

    // join a room

    socket.on("join", (room, cb)=> {
        socket.join(room);
        cb(`You have joined ${room}`);
    })

})

server.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});





