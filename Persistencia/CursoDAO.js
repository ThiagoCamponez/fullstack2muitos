import Curso from '../Modelo/Curso.js';
import conectar from './conexao.js';

export default class CursoDAO {
    constructor() {
        this.init();
    }

    // Método para inicializar a tabela Curso no banco de dados, se ela não existir
    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS Curso (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nome VARCHAR(100) NOT NULL,
                    descricao TEXT
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    // Método para gravar um novo curso
    async gravar(curso) {
        if (curso instanceof Curso) {
            const sql = `INSERT INTO Curso (nome, descricao) VALUES (?, ?)`;
            const parametros = [curso.nome, curso.descricao];

            const conexao = await conectar();
            const [resultado] = await conexao.execute(sql, parametros);
            curso.id = resultado.insertId;  // Atualiza o ID do curso com o ID gerado pelo banco
            await conexao.release();
        }
    }

    // Método para atualizar um curso existente
    async atualizar(curso) {
        if (curso instanceof Curso) {
            const sql = `UPDATE Curso SET nome = ?, descricao = ? WHERE id = ?`;
            const parametros = [curso.nome, curso.descricao, curso.id];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    // Método para excluir um curso
    async excluir(curso) {
        if (curso instanceof Curso) {
            const sql = `DELETE FROM Curso WHERE id = ?`;
            const parametros = [curso.id];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    // Método para buscar curso por ID
    async buscarPorId(id) {
        const conexao = await conectar();
        const sql = `SELECT * FROM Curso WHERE id = ?`;
        const parametros = [id];
        const [registros] = await conexao.execute(sql, parametros);
        await conexao.release();

        // Se encontrou um curso, retorna um objeto Curso, caso contrário, retorna null
        return registros.length > 0 ? new Curso(registros[0].id, registros[0].nome, registros[0].descricao) : null;
    }

    // Método para consultar cursos por termo (ID ou nome)
    async consultar(termo) {
        const conexao = await conectar();
        let listaCursos = [];

        if (!termo) {
            // Consulta sem termo retorna todos os cursos
            const sql = `SELECT * FROM Curso ORDER BY nome`;
            const [registros] = await conexao.execute(sql);
            listaCursos = registros.map(registro => new Curso(registro.id, registro.nome, registro.descricao));
        } else if (!isNaN(parseInt(termo))) {
            // Se o termo é um número, busca por ID
            const sql = `SELECT * FROM Curso WHERE id = ? ORDER BY nome`;
            const parametros = [termo];
            const [registros] = await conexao.execute(sql, parametros);
            listaCursos = registros.map(registro => new Curso(registro.id, registro.nome, registro.descricao));
        } else {
            // Caso contrário, busca pelo nome
            const sql = `SELECT * FROM Curso WHERE nome LIKE ? ORDER BY nome`;
            const parametros = ['%' + termo + '%'];
            const [registros] = await conexao.execute(sql, parametros);
            listaCursos = registros.map(registro => new Curso(registro.id, registro.nome, registro.descricao));
        }

        await conexao.release();
        return listaCursos;
    }
}
