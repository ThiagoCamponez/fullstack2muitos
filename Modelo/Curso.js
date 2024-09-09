import CursoDAO from "../Persistencia/CursoDAO.js";

export default class Curso {
    #id;
    #nome;
    #descricao;

    constructor(id, nome, descricao) {
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
    }

    // Getters e Setters
    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            descricao: this.descricao
        };
    }

    // Método para gravar um novo curso
    async gravar() {
        const cursoDAO = new CursoDAO();
        await cursoDAO.gravar(this);
    }

    // Método para atualizar um curso existente
    async atualizar() {
        const cursoDAO = new CursoDAO();
        await cursoDAO.atualizar(this);
    }

    // Método para excluir um curso
    async excluir() {
        const cursoDAO = new CursoDAO();
        await cursoDAO.excluir(this);
    }

    // Método para consultar cursos por termo
    async consultar(termoBusca) {
        const cursoDAO = new CursoDAO();
        return await cursoDAO.consultar(termoBusca);
    }

    // Método estático para buscar curso por ID
    static async buscarPorId(id) {
        const cursoDAO = new CursoDAO();
        const listaCursos = await cursoDAO.consultar(id); // Reutilizando o método consultar com o ID
        return listaCursos.length > 0 ? listaCursos[0] : null; // Retorna o curso encontrado ou null
    }

    // Método estático para buscar todos os cursos
    static async buscarTodos() {
        const cursoDAO = new CursoDAO();
        return await cursoDAO.consultar("");
    }
}
