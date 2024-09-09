import Curso from "../Modelo/Curso.js";
import CursoDAO from "../Persistencia/CursoDAO.js";

// Instancia o DAO de Curso
const cursoDAO = new CursoDAO();

export default class CursoCtrl {

    // Método para gravar um novo curso
    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const { nome, descricao } = requisicao.body;

            // Verifica se todos os campos obrigatórios estão presentes
            if (nome && descricao) {
                const curso = new Curso(0, nome, descricao);

                try {
                    await cursoDAO.gravar(curso); // Chama o método gravar do DAO
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": curso.id,
                        "mensagem": "Curso incluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o curso: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, preencha todos os campos obrigatórios corretamente!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um curso!"
            });
        }
    }

    // Método para atualizar um curso existente
    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const { id, nome, descricao } = requisicao.body;

            // Verifica se todos os campos obrigatórios estão presentes
            if (id && nome && descricao) {
                const curso = new Curso(id, nome, descricao);

                try {
                    await cursoDAO.atualizar(curso); // Chama o método atualizar do DAO
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Curso atualizado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o curso: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do curso conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um curso!"
            });
        }
    }

    // Método para excluir um curso
    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const { id } = requisicao.body;

            // Verifica se o ID do curso foi informado
            if (id) {
                const curso = new Curso(id);

                try {
                    await cursoDAO.excluir(curso); // Chama o método excluir do DAO
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Curso excluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o curso: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID do curso!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um curso!"
            });
        }
    }

    // Método para consultar cursos
    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo || "";

        if (requisicao.method === "GET") {
            try {
                const listaCursos = await cursoDAO.consultar(termo); // Chama o método consultar do DAO
                resposta.json({
                    status: true,
                    listaCursos
                });
            } catch (erro) {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter os cursos: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar cursos!"
            });
        }
    }

    // Método para buscar um curso específico por ID
    async buscarPorId(requisicao, resposta) {
        resposta.type('application/json');
        const { id } = requisicao.params;

        if (requisicao.method === "GET") {
            try {
                const curso = await cursoDAO.buscarPorId(id);  // Chama o método buscarPorId do DAO
                if (curso) {
                    resposta.json({
                        status: true,
                        curso
                    });
                } else {
                    resposta.status(404).json({
                        status: false,
                        mensagem: "Curso não encontrado!"
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao buscar o curso: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para buscar um curso!"
            });
        }
    }
}
