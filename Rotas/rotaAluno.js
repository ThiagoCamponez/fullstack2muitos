import { Router } from "express";
import AlunoCtrl from "../Controle/AlunoCtrl.js";

const alunoCtrl = new AlunoCtrl();
const rotaAluno = new Router();

rotaAluno
    .get('/', alunoCtrl.consultar)        // Rota para consultar todos os alunos ou por termo
    .get('/:id', alunoCtrl.buscarPorId)   // Rota para buscar um aluno específico por ID
    .post('/', alunoCtrl.gravar)          // Rota para gravar um novo aluno
    .patch('/:id', alunoCtrl.atualizar)   // Rota para atualizar parcialmente um aluno
    .put('/:id', alunoCtrl.atualizar)     // Rota para atualizar completamente um aluno
    .delete('/:id', alunoCtrl.excluir);   // Rota para excluir um aluno

export default rotaAluno;
