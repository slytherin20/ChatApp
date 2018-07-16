const express=require('express');
const http = require('http');
const app=express();
const socketServer = http.Server(app);
const socket = require('socket.io');
const PORT = process.env.PORT || 5000;
const io = socket(socketServer);
let messages = [];
let connected_user = new Object();
app.use('/',express.static('public'));
io.on('connection',function(sk){
  sk.on('userdetails',function(data){
      connected_user[sk.id]=data;
      console.log(connected_user);
      io.emit('show users',connected_user);
  });
  sk.on('message',function(data){
    messages.push(data);
    io.emit('show',data);
  });
  sk.emit('ms',messages);
  sk.on('disconnect',function(){
      delete connected_user[sk.id];
      console.log(connected_user);
      io.emit('show users',connected_user);
  });
});
socketServer.listen(PORT,function(){
  console.log("Server is listening on port"+PORT);
});

