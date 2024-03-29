const express=require('express');
const App=express();
const PORT=3333;

const SocketIO=require('socket.io');
const http=require('http');

const {Server}=SocketIO;

const httpServer=http.createServer(App);
const IO=new Server(httpServer);

App.use(express.static('client'));  // Here we use the middleware

function StartServer(){
    console.log("server is live now");
}

httpServer.listen(PORT,StartServer);

IO.on('connection',(socket)=>{
    console.log('connection established', socket.id);
    socket.on('chat message',(data)=>{
        IO.emit('chat message',data);
    })
    socket.on('disconnect',()=>{
        console.log(socket.id,'left the chat');
    })
})