# PONTIFÍCIA UNIVERSIDADE CATÓLICA DE MINAS GERAIS - PUC-MG

## Pós Graduação - Arquitetura de Soluções

### Disciplina: APIs e WebServices - Professor: Rommel Vieira Carneiro

#### Trabalho Prático 1 - Implementação de API RESTful com cache

* Este trablho tem por objetivo a implementação de uma API RESTful(com cache), desenvolvida em Node e deve conter uma estrutura de interface simples para as operações de CRUD:

| Ação                            | Operação (CRUD)            | Mapeamento da URL     |
| :-----------------------------: | :------------------------: | :-------------------: |
| Incluir um produto              | CREATE                     | POST / produtos /     |
| Obter a lista de produtos       | RETRIEVE                   | GET / produtos        |
| Obter um produto específico     | RETRIEVE                   | GET / produtos /:id   |
| Alterar um produto              | UPDATE                     | PUT / produtos /:id   |
| Excluir um produto              | DELETE                     | DELETE /produtos/:id  |

Deverá também incluir uma lógica para tratar um sistema de cache da seguinte forma para requisições para a lista de todos os produtos ou um único produto (método GET):

1. se os dados forem alterados, deve retornar o array com os dados atuais de produtos e um código de status 200 (Ok).
2. se os dados solicitados não foram alterados desde a última requisição e já estiverem no cache, retornar código de status 304 (Not Modified)


Observações:

Para visualizar e utilizar a API e todas as suas funcionalidades, será necessário a instalação do Node e suas dependências, além de um editor de texto, podendo ser o VSCode ou qualquer outro similar.

Com tudo instalado em sua máquina, na pasta raiz do projeto, deve-se executar o comando: "node index.js"
Se tudo estiver funcionando corretamente, a mensagem "O Servidor está rodando na porta 3000" deverá ser exibida no terminal.

Para executar os testes na API, importe o arquivo "APIs_e_WebSockets.postman_collection", que está na raiz do projeto, para alguma plataforma de gerenciamento de APIs como Postman, Insomnia, etc.

Feita a importação, basta utilizar os comandos POST, GET, DELETE e PUT, lembrando que o servidor da aplicação deve estar ativo.

Qulquer dúvida estou à disposição;

[]'s

