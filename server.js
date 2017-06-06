const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use('app/css',express.static(__dirname + '/css'));
app.use('app/js',express.static(__dirname + '/js'));
app.use('app/assets',express.static(__dirname + '/img'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/app/index.html');
});

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});
