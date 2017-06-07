const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/app/css'));
app.use('/js',express.static(__dirname + '/app/js'));
app.use('/img',express.static(__dirname + '/app/img'));
app.use('/tiles',express.static(__dirname + '/app/tiles'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/app/index.html');
});

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});
