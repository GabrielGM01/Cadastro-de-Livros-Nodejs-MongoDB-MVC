const Livros = require('../models/cadastroModel');

exports.index = async (req, res) => {
  const livros = await Livros.buscaLivros();
  res.render('index', {livros});
};

