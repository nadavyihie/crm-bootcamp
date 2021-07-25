var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var roomsVar=[];

app.get('/1', function(req, res) {
   res.sendfile('index.html');
});

app.get('/2', function(req, res) {
    res.sendfile('index2.html');
 });
 

 io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join_room',room=>{
    
        io.emit('new_client', room);
        console.log("join_client_to_room");
        socket.join(room);
      
    })

    socket.on('join_crm_to_room',room=>{
        console.log("join_crm_to_room");
        socket.join(room);
      
    })
    socket.on('message',({room,message})=>{
        console.log(room,message);
        socket.to(room).emit("message",message);
    })
    

  });

http.listen(9000, function() {
   console.log('listening on localhost:9000');
});