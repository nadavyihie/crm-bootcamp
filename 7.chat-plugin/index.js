var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var  tempCrmSocket="";

var roomCount=1;
app.get('/crm-side', function(req, res) {
 
   
   res.sendfile('index.html');
   
});

app.get('/client-side', function(req, res) {
   
    res.sendfile('index2.html');
 });
 

 io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('crmListening',()=>{
        console.log('crm is listening')
        tempCrmSocket=socket;
    })

    socket.on('joinClientToRoom',()=>{
        if(tempCrmSocket!=null){
        const tempRoom=`room-${roomCount}`;
        console.log("Join client to: ",tempRoom);
        socket.join(tempRoom);
        tempCrmSocket.join(tempRoom);
        io.to(tempRoom).emit('sendRoomToParticipants',tempRoom)
        tempCrmSocket=null;
        roomCount++;
        }
       
    })

    socket.on('typing',(room)=>{
      console.log('typinggggg')
       
        socket.to(room).emit('isTyping');
        })
       
    



    socket.on('joinCrmToRoom',room=>{
        console.log("Join crm to: ",room);
        socket.join(room);
      
    })
    socket.on('message',({room,message})=>{
        console.log(`room: ${room}, message: ${message}`);
        socket.to(room).emit("message",message);
    })
    

  });

http.listen(9000, function() {
   console.log('listening on localhost:9000');
});