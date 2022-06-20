const { Router } = require('express');
const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const cadastroController = require('./src/controllers/cadastroController');


// Rotas da home
route.get('/', homeController.index);

// Rota de cadastro do livro
route.get('/cadastro/livros', cadastroController.index);
route.post('/cadastro/livros', cadastroController.register);



module.exports = route;
