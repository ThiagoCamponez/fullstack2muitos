import { Router } from "express";
import AlunoCursoCtrl from "../Controle/AlunoCursoCtrl.js";

const alunoCursoCtrl = new AlunoCursoCtrl();
const rotaAlunoCurso = new Router();

rotaAlunoCurso
    .post('/associar', alunoCursoCtrl.associar)                      // Rota para associar um aluno a um curso
    .get('/cursosPorAluno/:aluno_id', alunoCursoCtrl.buscarCursosPorAluno)  // Rota para buscar cursos por aluno
    .get('/alunosPorCurso/:curso_id', alunoCursoCtrl.buscarAlunosPorCurso); // Rota para buscar alunos por curso

export default rotaAlunoCurso;
