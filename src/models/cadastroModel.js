const mongoose = require("mongoose");

const cadastroSchema = new mongoose.Schema({
    nomeLivro:{type:String, required:true},
    autorLivro:{type:String, required:true},
    dataPublicacao:{type:String, required:true},
});

const CadastroModel = mongoose.model('Livros',cadastroSchema);

function Livros(body){
    this.body = body;
    this.errors = [];
    this.cadastro = null;
};

Livros.prototype.register = async function(){
    this.valida();
    if(this.errors.length > 0) return;
    this.cadastro = await CadastroModel.create(this.body);
};


Livros.prototype.valida = function(){
    this.cleanUp();
    if(!this.body.nomeLivro)this.errors.push('Nome do livro é um campo obrigatório.');
    if(!this.body.autorLivro)this.errors.push('Autor do livro é um campo obrigatório.');
    if(!this.body.dataPublicacao)this.errors.push('Data de publicação do livro é um campo obrigatório.');
};

Livros.prototype.cleanUp = function(){
    this.body = {
        nomeLivro: this.body.nomeLivro,
        autorLivro: this.body.autorLivro,
        dataPublicacao: this.body.dataPublicacao
    };
};




Livros.buscaLivros = async function(){
    const livros =  await CadastroModel.find();
    return livros;
};

module.exports = Livros;