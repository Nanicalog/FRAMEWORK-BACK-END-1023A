import mysql from 'mysql2/promise';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';

const app = fastify();
app.register(cors);

// Rota de teste
app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send('Fastify Funcionando');
});

// Rota para listar produtos
app.get('/adiciona_lista', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'listagem_sapatos',
      port: 3306
    });

    const resultado = await conn.query('SELECT * FROM adiciona_sapatos');
    const [dados] = resultado;
    reply.status(200).send(dados);
  } catch (erro: any) {
    if (erro.code === 'ECONNREFUSED') {
      console.log('ERRO: LIGUE O LARAGÃO => Conexão Recusada');
      reply.status(400).send({ mensagem: 'ERRO: LIGUE O LARAGÃO => Conexão Recusada' });
    } else if (erro.code === 'ER_BAD_DB_ERROR') {
      console.log('ERRO: CRIE UM BANCO DE DADOS COM O NOME DEFINIDO NA CONEXÃO');
      reply.status(400).send({ mensagem: 'ERRO: CRIE UM BANCO DE DADOS COM O NOME DEFINIDO NA CONEXÃO' });
    } else if (erro.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('ERRO: CONFERIR O USUÁRIO E SENHA DEFINIDOS NA CONEXÃO');
      reply.status(400).send({ mensagem: 'ERRO: CONFERIR O USUÁRIO E SENHA DEFINIDOS NA CONEXÃO' });
    } else if (erro.code === 'ER_NO_SUCH_TABLE') {
      console.log('ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY');
      reply.status(400).send({ mensagem: 'ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY' });
    } else if (erro.code === 'ER_PARSE_ERROR') {
      console.log('ERRO: Erro de sintaxe na QUERY');
      reply.status(400).send({ mensagem: 'ERRO: Você tem um erro de escrita em sua QUERY' });
    } else {
      console.log(erro);
      reply.status(400).send({ mensagem: 'ERRO: NÃO IDENTIFICADO' });
    }
  }
});

// Rota para adicionar os sapatos na lista
app.post('/adiciona_lista', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id, nome } = request.body as any;

  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'listagem_sapatos',
      port: 3306
    });

    const resultado = await conn.query('INSERT INTO adiciona_lista (id, nome, preco, tamanho) VALUES (?, ?)', [id, nome, preco, tamanho]);
    const [dados] = resultado;
    reply.status(200).send(dados);
  } catch (erro: any) {
    switch (erro.code) {
      case 'ECONNREFUSED':
        console.log('ERRO: LIGUE O LARAGÃO!!! CABEÇA!');
        reply.status(400).send({ mensagem: 'ERRO: LIGUE O LARAGÃO!!! CABEÇA!' });
        break;
      case 'ER_BAD_DB_ERROR':
        console.log('ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM O NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO');
        reply.status(400).send({ mensagem: 'ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM O NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO' });
        break;
      case 'ER_ACCESS_DENIED_ERROR':
        console.log('ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO');
        reply.status(400).send({ mensagem: 'ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO' });
        break;
      case 'ER_DUP_ENTRY':
        console.log('ERRO: VOCÊ DUPLICOU A CHAVE PRIMÁRIA')
