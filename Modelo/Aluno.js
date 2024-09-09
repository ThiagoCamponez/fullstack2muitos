import AlunoDAO from "../Persistencia/AlunoDAO.js";

export default class Aluno {
    #id;
    #nome;
    #email;

    constructor(id, nome, email) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
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

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email
        };
    }

    // Método para gravar um novo aluno
    async gravar() {
        const alunoDAO = new AlunoDAO();
        await alunoDAO.gravar(this);
    }

    // Método para atualizar um aluno existente
    async atualizar() {
        const alunoDAO = new AlunoDAO();
        await alunoDAO.atualizar(this);
    }

    // Método para excluir um aluno
    async excluir() {
        const alunoDAO = new AlunoDAO();
        await alunoDAO.excluir(this);
    }

    // Método para consultar alunos por termo
    async consultar(termoBusca) {
        const alunoDAO = new AlunoDAO();
        return await alunoDAO.consultar(termoBusca);
    }

    // Método estático para buscar aluno por ID
    static async buscarPorId(id) {
        const alunoDAO = new AlunoDAO();
        const listaAlunos = await alunoDAO.consultar(id); // Reutilizando o método consultar com o ID
        return listaAlunos.length > 0 ? listaAlunos[0] : null; // Retorna o aluno encontrado ou null
    }

    // Método estático para buscar todos os alunos
    static async buscarTodos() {
        const alunoDAO = new AlunoDAO();
        return await alunoDAO.consultar("");
    }
}
