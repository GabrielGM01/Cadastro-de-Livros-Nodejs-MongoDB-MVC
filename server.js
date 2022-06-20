require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect(process.env.CONNECTIONSTRING)
.then(()=> {
  app.emit('pronto');
}).catch(e => console.log(e));



const routes = require('./routes');
const path = require('path');
const { middlewareGlobal} = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(flash());
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));
  
app.use(middlewareGlobal);
app.use(routes);
app.on('pronto',()=>{
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
})


