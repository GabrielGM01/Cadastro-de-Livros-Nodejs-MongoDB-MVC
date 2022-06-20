const Livros = require('../models/cadastroModel');

exports.index = (req,res)=>{
  res.render('cadastro',{
    livro:{}
  });
};

exports.register = async (req,res)=>{
  const livro = new Livros(req.body);
  await livro.register();
  if(livro.errors.length > 0){
    req.flash('errors', livro.errors);
    req.session.save(() => res.redirect(`back`));
    return;
  }
  else{
    req.flash('success', 'Livro registrado com sucesso.');
    req.session.save(() => res.redirect(`back`));
    return;
  }
};