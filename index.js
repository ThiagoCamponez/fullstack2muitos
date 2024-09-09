import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import rotaAluno from './Rotas/rotaAluno.js';
import rotaCurso from './Rotas/rotaCurso.js';
import rotaAlunoCurso from './Rotas/rotaAlunoCurso.js';
import login, { verificarAutenticacao, logout } from './Seguranca/autenticar.js';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const host = '0.0.0.0';
const porta = 3000;

// Inicializar o aplicativo Express
const app = express();



// Configuração de sessão
app.use(session({
    secret: process.env.CHAVE_SECRETA, // Use a chave secreta para criptografar a sessão
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15 } // Expira em 15 minutos
}));

// Middleware para habilitar CORS e parsing de JSON
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Middleware para processamento de JSON
app.use(express.json());

// Rota de login
app.post('/login', login);

// Rota de logout
app.post('/logout', logout);

// Rotas de Autenticação
app.use('/autenticacao', rotaAutenticacao);

// Usar o middleware de autenticação para rotas protegidas
app.use('/aluno', verificarAutenticacao, rotaAluno);         // Rotas para Aluno
app.use('/curso', verificarAutenticacao, rotaCurso);         // Rotas para Curso
app.use('/alunoCurso', verificarAutenticacao, rotaAlunoCurso); // Rotas para AlunoCurso

// Iniciar o servidor
app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
