let express = require('express')
let app = express()
const cors = require('cors'); // Instalar isto via   npm install cors
//let load = require('express-load')
//let error = require('./middleware/error')
let server = require('http').createServer(app)
let socketio = require('socket.io')

const enableCors={
    cors: {
      origin: '*',
    }
  }

let io = socketio(server,enableCors);

let router = require("./router");

const porta = process.env.PORT || 5000;

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

io.on('connection', (socket)=>{ 
    console.log(`Socket conectado ${socket.id}`);

    socket.on('chat.message', ( data) => {
        //io.emit('message', { name, message })
        //socket.broadcast.emit('receberMessage', data); // Enviar esta mensagem para o front-end ouvir
        console.log("{ name, message }",data);
        //socket.emit('chat.message1', data); // Envia a mensagem para o front-end visualizar
        io.emit('chat.message1', data);
        //socket.broadcast.emit('chat.message1', data);
        
      })
    //socket.on('send-server', function ( ) {

        console.log("conectado");
        //console.log("conectado",data.id);

        //let msg = "<b>"+data.nome+":</b> "+data.msg+"<br>";
        //client.emit('send-client', msg);
        //client.broadcast.emit('send-client', msg);
   //});

   socket.on('disconectado', function ( ) {
       //console.log("disconectou",data.id);
       console.log("disconectou");
   });
});



app.use(router);

server.listen(porta, function (){
   console.log(`Servidor iniciado na porta ${porta}`);
});