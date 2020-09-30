Basic Node.JS Project

O aplicativo é backend que expõe uma API RESTful de criação de sing up/sign in.
Todos os endpoints devem somente aceitar e somente enviar JSONs. 
O servidor retornar JSON para os casos de endpoint não encontrado também.
Todas as respostas de erro devem retornam objetos do tipo:

    {
        "mensagem": "mensagem de erro"
    }

Segue a documentação dos endpoints:

# / [get]

Health-check

# /sign-up [post]

Este endpoint deverá receber um usuário com os seguintes campos: nome, email, senha e uma lista de objetos telefone. [Todos Obrigatórios]

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

# /sign-in [post]

* Este endpoint irá receber um objeto com e-mail e senha.


    {

        "email": "string",
        "senha": "string",
    }

* No sucesso o retorno será o mesmo do sign-in


# /find/:id [get]

* Chamadas para este endpoint devem conter um header na requisição de Authentication com o valor "Bearer {token}" onde {token} é o valor do token passado na criação ou sign in de um usuário.

# Application

* A aplicação está hospedada na [AWS em um EC2](http://3.137.216.170/) .

* O banco está hospedado pelo [mLab](https://mlab.com/).

# Docker

O código é bem simples, e para rodar o container são necessárias apenas 2 variáveis:

ACCESS_TOKEN_SECRET = seu secret para o JWT

MONGO = String inteira de conexão para o mongo. 