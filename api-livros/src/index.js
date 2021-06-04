const express = require('exress');
const { uuid } = require('uuidv4');

const app = express();

app.usse(express.json());

const livros = require("./livros.json")
app.get('./livros', (request, response) => {
    const {titulo} = request.query;
    
    const resultado = titulo
    ? livros.filter( livro => livro.titulo.includes(titulo) )
    : livros

    return response.json(resultado);
});

app.post('./livros', (request, response) => {

    const { titulo, descricao, autor, anoPublicacao } = request.body;

    const livro = { id: uuid(), titulo, descricao, autor, anoPublicacao };
    livros.push(livro)

    return response.json( livros )
});

app.put('./livros/', (request, response) => {

    const {id, titulo, descricao, autor, anoPublicacao} = request.body;

    const indiceLivro = Livros.findindex( livro => livro.id === id );

    if(indiceLivro < 0) {
        return response.status(400).json({ error: 'Livro não encontrado.' });
    }
    
    const livro ={
        id,
        titulo,
        descricao,
        autor,
        anoPublicacao
    }

    livros[indiceLivro] = livro;

    return response.json(livro);
});

app.delete('/livros/:id', (request, response) => {
    const { id } = request.parms;

    const indiceLivro = livros.findIndex( livro => livro.id === Number(id) );

    if( indiceLivro < 0) {
        return response.status(400).json({ error: 'livro não encontrado.' });
    }
    livros.splice(indiceLivro, 1);

    return response.status(204).send();
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))