import AlunoCursoDAO from "../Persistencia/AlunoCursoDAO.js";

export default class AlunoCurso {
    #aluno_id;
    #curso_id;

    constructor(aluno_id, curso_id) {
        this.#aluno_id = aluno_id;
        this.#curso_id = curso_id;
    }

    // Getters e Setters
    get aluno_id() {
        return this.#aluno_id;
    }

    set aluno_id(novoAlunoId) {
        this.#aluno_id = novoAlunoId;
    }

    get curso_id() {
        return this.#curso_id;
    }

    set curso_id(novoCursoId) {
        this.#curso_id = novoCursoId;
    }

    // Método para associar um aluno a um curso
    async associar() {
        const alunoCursoDAO = new AlunoCursoDAO();
        await alunoCursoDAO.associar(this);
    }

    // Método estático para buscar cursos por aluno
    static async buscarCursosPorAluno(aluno_id) {
        const alunoCursoDAO = new AlunoCursoDAO();
        return await alunoCursoDAO.buscarCursosPorAluno(aluno_id);
    }

    // Método estático para buscar alunos por curso
    static async buscarAlunosPorCurso(curso_id) {
        const alunoCursoDAO = new AlunoCursoDAO();
        return await alunoCursoDAO.buscarAlunosPorCurso(curso_id);
    }
}
