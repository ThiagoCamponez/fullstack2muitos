import { Router } from "express";
import CursoCtrl from "../Controle/CursoCtrl.js";

const cursoCtrl = new CursoCtrl();
const rotaCurso = new Router();

rotaCurso
    .get('/', cursoCtrl.consultar)        // Rota para consultar todos os cursos ou por termo
    .get('/:id', cursoCtrl.buscarPorId)   // Rota para buscar um curso específico por ID
    .post('/', cursoCtrl.gravar)          // Rota para gravar um novo curso
    .patch('/:id', cursoCtrl.atualizar)   // Rota para atualizar parcialmente um curso
    .put('/:id', cursoCtrl.atualizar)     // Rota para atualizar completamente um curso
    .delete('/:id', cursoCtrl.excluir);   // Rota para excluir um curso

export default rotaCurso;
