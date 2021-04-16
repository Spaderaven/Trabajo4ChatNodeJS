var express = require('express');
var socket = require('socket.io')

// App setup
var Port = process.env.PORT || 4000;
var app = express();
var server = app.listen(Port, function(){
    console.log("Escuchando");
});

// Static Files
app.use(express.static('public'));


// Socket Setup
var io = socket(server);

io.on('connection', function(socket) { 
    console.log("Conexion Hecha"); 
    console.log(socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data)
    })


    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })

})

