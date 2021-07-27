var app = require('express')();
const cors = require('cors');
app.use(cors());
var http = require('http').Server(app);
// var io = require('socket.io')(http)
 var io = require("socket.io")(http, {
    cors: {

      origin: ["http://localhost:3000"," http://localhost:9000"],
    },
  });
    

    

var  tempCrmSocket="";
var crmSocket="";
var roomCount=1;
// app.get(`/crm-side`, function(req, res) {
 
   
//    res.sendfile(`index.html`);
   
// });

app.get('/client-side', function(req, res) {
   
    res.sendfile('index2.html');
 });
 

 io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('crmListening',()=>{
        console.log('crm is listening')
        crmSocket=socket;
    })

    socket.on('joinClientToRoom',()=>{
        const tempRoom=`room-${roomCount}`;
        console.log("Join client to: ",tempRoom);
        socket.join(tempRoom);
        crmSocket.join(tempRoom);
        io.to(tempRoom).emit('sendRoomToParticipants',tempRoom)
        roomCount++;
        
       
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
        socket.to(room).emit("message",message,room);
    })
    

  });

http.listen(9000, function() {
   console.log('listening on localhost:9000');
});