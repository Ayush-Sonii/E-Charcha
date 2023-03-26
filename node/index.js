const io = require('socket.io')(8000,{
    cors: {
      origin: "*"}})/*{
    cors: {
      origin: "http://localhost:8000"
    }
});*/
// import { Server } from "socket.io";

// const io = new Server(3000);

const users ={};

io.on('connection',socket=>{
    socket.on('user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('join',name);
    })
    
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message : message,name: users[socket.id]})
    })

    socket.on('disconnect',name=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    }) 
})