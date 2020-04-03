const express = require('express');
const mongoose = require('mongoose');
const path = require('path')

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(cors())

io.on('connection', socket => {
    socket.on('connectRoom', box =>{
        socket.join(box);
    });
});

//iniciando o db
mongoose.connect(
    'mongodb+srv://victor:ykRoVBszJ26Q60qu@cluster0-zm5z2.mongodb.net/rocketbox?retryWrites=true&w=majority', 
    {   
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));


app.use(require('./routes'));
server.listen(process.env.PORT || 3333);