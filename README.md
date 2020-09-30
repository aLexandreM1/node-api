Basic Node.JS Project

O aplicativo é backend que expõe uma API RESTful de criação de usuário, login e busca de usuário.
Todos os endpoints aceitam e enviam somente JSONs. 
Todas as respostas de erro devem objetos do tipo:

    {
        "mensagem": "mensagem de erro"
    }

Segue a documentação dos endpoints:

### [GET] Health-check

# / 

### [POST] Cadastro

# /sign-up 

Este endpoint deverá receber um usuário com os seguintes campos: nome, email, senha e uma lista de objetos telefone. [Todos obrigatórios]

    {

        "nome": "string",
        "email": "string",
        "senha": "string",
        "telefones": [
            {
                "numero": "string",         # [length = 9]
                "ddd": "string"             # [length = 2]
            }
            ]
    }

* Em caso de sucesso irá retornar um usuário mais os campos:

* id: id do usuário (objectId)

* data_criacao: data da criação do usuário

* data_atualizacao: data da última atualização do usuário

* ultimo_login: data do último login

* token: token de acesso da API

### [POST] Login

# /sign-in

* Este endpoint irá receber um objeto com e-mail e senha.


    {

        "email": "string",
        "senha": "string",
    }

* No sucesso o retorno será o mesmo do sign-in

### [GET] buscar usuário

# /find/:id

* Chamadas para este endpoint devem conter um header na requisição de Authentication com o valor "Bearer {token}" onde {token} é o valor do token passado na criação ou sign in de um usuário.

* O id é retornado na hora de criação ou login do usuário, um objectId

* Ex: Para encontrar um usuário /find/5f73f4509010dcdc007aa488

# Aplicação

* A aplicação está hospedada na [AWS em um EC2](http://3.137.216.170/) .

* O banco está hospedado pelo [mLab](https://mlab.com/).

* Jest e Supertest para testes unitários e integração. ![Testes](https://cdn.discordapp.com/attachments/317906998995714048/760859539624034324/unknown.png?raw=true)

* Husky + Lint:Staged para validação de commits na staged.

* StandardJS como linter. 

# Docker

O código é bem simples, e para rodar o container são necessárias apenas 2 env-vars:

ACCESS_TOKEN_SECRET = seu secret para o JWT

MONGO = String inteira de conexão para o mongo. 