import AlunoCurso from '../Modelo/AlunoCurso.js';

export default class AlunoCursoCtrl {
    // Método para associar um aluno a um curso
    async associar(req, res) {
        const { aluno_id, curso_id } = req.body;

        try {
            const alunoCurso = new AlunoCurso(aluno_id, curso_id);
            await alunoCurso.associar();
            res.status(200).json({ status: true, mensagem: 'Associação feita com sucesso!' });
        } catch (erro) {
            res.status(500).json({ status: false, mensagem: 'Erro ao associar aluno e curso: ' + erro.message });
        }
    }

    // Método para buscar cursos por aluno
    async buscarCursosPorAluno(req, res) {
        const { aluno_id } = req.params;

        try {
            const cursos = await AlunoCurso.buscarCursosPorAluno(aluno_id);
            res.json({ status: true, cursos });
        } catch (erro) {
            res.status(500).json({ status: false, mensagem: 'Erro ao buscar cursos por aluno: ' + erro.message });
        }
    }

    // Método para buscar alunos por curso
    async buscarAlunosPorCurso(req, res) {
        const { curso_id } = req.params;

        try {
            const alunos = await AlunoCurso.buscarAlunosPorCurso(curso_id);
            res.json({ status: true, alunos });
        } catch (erro) {
            res.status(500).json({ status: false, mensagem: 'Erro ao buscar alunos por curso: ' + erro.message });
        }
    }
}
