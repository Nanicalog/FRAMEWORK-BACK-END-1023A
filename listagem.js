import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import fastify, { FastifyRequest, FastifyReply } from 'fastify'
import cors from '@fastify/cors'
const app = fastify()
app.register(cors)

/*conexão com o bando de dados
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'listagem_sapatos',
  password: '',
  port: 8000,
});//
