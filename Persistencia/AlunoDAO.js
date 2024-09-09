import Aluno from '../Modelo/Aluno.js';
import conectar from './conexao.js';

export default class AlunoDAO {
    constructor() {
        this.init();
    }

    // Método para inicializar a tabela Aluno no banco de dados, se ela não existir
    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS Aluno (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nome VARCHAR(100) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    // Método para gravar um novo aluno
    async gravar(aluno) {
        if (aluno instanceof Aluno) {
            const sql = `INSERT INTO Aluno (nome, email) VALUES (?, ?)`;
            const parametros = [aluno.nome, aluno.email];

            const conexao = await conectar();
            const [resultado] = await conexao.execute(sql, parametros);
            aluno.id = resultado.insertId; // Atualiza o ID do aluno com o ID gerado pelo banco
            await conexao.release();
        }
    }

    // Método para atualizar um aluno existente
    async atualizar(aluno) {
        if (aluno instanceof Aluno) {
            const sql = `UPDATE Aluno SET nome = ?, email = ? WHERE id = ?`;
            const parametros = [aluno.nome, aluno.email, aluno.id];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    // Método para excluir um aluno
    async excluir(aluno) {
        if (aluno instanceof Aluno) {
            const sql = `DELETE FROM Aluno WHERE id = ?`;
            const parametros = [aluno.id];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    // Método para buscar aluno por ID
    async buscarPorId(id) {
        const conexao = await conectar();
        const sql = `SELECT * FROM Aluno WHERE id = ?`;
        const parametros = [id];
        const [registros] = await conexao.execute(sql, parametros);
        await conexao.release();

        // Se encontrou um aluno, retorna um objeto Aluno, caso contrário, retorna null
        return registros.length > 0 ? new Aluno(registros[0].id, registros[0].nome, registros[0].email) : null;
    }

    // Método para consultar alunos por termo (ID ou nome)
    async consultar(termo) {
        const conexao = await conectar();
        let listaAlunos = [];

        if (!termo) {
            // Consulta sem termo retorna todos os alunos
            const sql = `SELECT * FROM Aluno ORDER BY nome`;
            const [registros] = await conexao.execute(sql);
            listaAlunos = registros.map(registro => new Aluno(registro.id, registro.nome, registro.email));
        } else if (!isNaN(parseInt(termo))) {
            // Se o termo é um número, busca por ID
            const sql = `SELECT * FROM Aluno WHERE id = ? ORDER BY nome`;
            const parametros = [termo];
            const [registros] = await conexao.execute(sql, parametros);
            listaAlunos = registros.map(registro => new Aluno(registro.id, registro.nome, registro.email));
        } else {
            // Caso contrário, busca pelo nome
            const sql = `SELECT * FROM Aluno WHERE nome LIKE ? ORDER BY nome`;
            const parametros = ['%' + termo + '%'];
            const [registros] = await conexao.execute(sql, parametros);
            listaAlunos = registros.map(registro => new Aluno(registro.id, registro.nome, registro.email));
        }

        await conexao.release();
        return listaAlunos;
    }
}
