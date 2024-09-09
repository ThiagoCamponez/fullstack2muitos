import conectar from './conexao.js';

export default class AlunoCursoDAO {
    // Método para associar um aluno a um curso
    async associar(alunoCurso) {
        if (alunoCurso.aluno_id && alunoCurso.curso_id) {
            const conexao = await conectar();
            await conexao.execute('INSERT INTO Aluno_Curso (aluno_id, curso_id) VALUES (?, ?)', [alunoCurso.aluno_id, alunoCurso.curso_id]);
            await conexao.release();
        }
    }

    // Método para buscar cursos por aluno
    async buscarCursosPorAluno(aluno_id) {
        const conexao = await conectar();
        const [rows] = await conexao.execute('SELECT c.* FROM Curso c JOIN Aluno_Curso ac ON c.id = ac.curso_id WHERE ac.aluno_id = ?', [aluno_id]);
        await conexao.release();
        return rows;
    }

    // Método para buscar alunos por curso
    async buscarAlunosPorCurso(curso_id) {
        const conexao = await conectar();
        const [rows] = await conexao.execute('SELECT a.* FROM Aluno a JOIN Aluno_Curso ac ON a.id = ac.aluno_id WHERE ac.curso_id = ?', [curso_id]);
        await conexao.release();
        return rows;
    }
}
