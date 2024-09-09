import Aluno from "../Modelo/Aluno.js";
import AlunoDAO from "../Persistencia/AlunoDAO.js";

// Instancia o DAO de Aluno
const alunoDAO = new AlunoDAO();

export default class AlunoCtrl {

    // Método para gravar um novo aluno
    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const { nome, email } = requisicao.body;

            // Verifica se todos os campos obrigatórios estão presentes
            if (nome && email) {
                const aluno = new Aluno(0, nome, email);

                try {
                    await alunoDAO.gravar(aluno);  // Chama o método gravar do DAO
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": aluno.id,
                        "mensagem": "Aluno incluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o aluno: " + erro.message
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
                "mensagem": "Por favor, utilize o método POST para cadastrar um aluno!"
            });
        }
    }

    // Método para atualizar um aluno existente
    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const { id, nome, email } = requisicao.body;

            // Verifica se todos os campos obrigatórios estão presentes
            if (id && nome && email) {
                const aluno = new Aluno(id, nome, email);

                try {
                    await alunoDAO.atualizar(aluno);  // Chama o método atualizar do DAO
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Aluno atualizado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o aluno: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do aluno conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um aluno!"
            });
        }
    }

    // Método para excluir um aluno
    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const { id } = requisicao.body;
            
            // Verifica se o ID do aluno foi informado
            if (id) {
                const aluno = new Aluno(id);
                try {
                    await alunoDAO.excluir(aluno);  // Chama o método excluir do DAO
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Aluno excluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o aluno: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID do aluno!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um aluno!"
            });
        }
    }

    // Método para consultar alunos
    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo || "";

        if (requisicao.method === "GET") {
            try {
                const listaAlunos = await alunoDAO.consultar(termo);  // Chama o método consultar do DAO
                resposta.json({
                    status: true,
                    listaAlunos
                });
            } catch (erro) {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter os alunos: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar alunos!"
            });
        }
    }
    // Método para buscar um aluno específico por ID
    async buscarPorId(requisicao, resposta) {
        resposta.type('application/json');
        const { id } = requisicao.params;

        if (requisicao.method === "GET") {
            try {
                const aluno = await alunoDAO.buscarPorId(id);  // Chama o método buscarPorId do DAO
                if (aluno) {
                    resposta.json({
                        status: true,
                        aluno
                    });
                } else {
                    resposta.status(404).json({
                        status: false,
                        mensagem: "Aluno não encontrado!"
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao buscar o aluno: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para buscar um aluno!"
            });
        }
    }

}
