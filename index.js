const { request } = require('express')
const express = require('express')  /*importando a bibliioteca para a aplicação*/
const uuid = require('uuid')

const port = 3000 /*nesse caso, a porta foi colocada em uma variável*/

const app = express() /*Para tornar mais fácil chmar a biblioteca*/
app.use(express.json()) /*Avisando que vai ser usado json colocar n aparte de cima antes das rotas*/

/*Criando a rota*/

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params /*Para saber qual usuário vai ser atualizado*/

    const index = users.findIndex(user => user.id === id) /*Encontrar o usuário dentro do array conforme recebido no put. retorna a posição do usuário*/

    if (index < 0) { /*caso o usuário não seja localizado ele cai nesse if  (-1)*/
        return response.status(404).json({ error: "Used not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body /*Informações no corpo que serão atualizadas*/
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id , name, age } /*Criando o usuário atualizado*/


    users[index] = updateUser /* sabendo o usuário que deve ser alterado, aqui ele atualiza*/


    return response.json(updateUser) /*mostra na tela o usuário atualizado*/
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})






/*const name = request.query.name
const age = request.query.age*/

/*Uma outra forma de fazer as variaveis acima é const {name, age} = request.query conforme aula sobre Query Params ((Destructuring assignment ))*/

/*console.log(name, age)*/

/*return response.json({name: name, age: age}) /*Quando o nome da chave e do valor são os mesmos pode omitir uma informação*/

app.listen(3000)

/*porta 3000 está sendo usada*/

/*para iniciar o servidor é necessário escrevcer no terminal "node + nome do arquivo. Para parar o servidor tem 
que digitar "CTRL + C"*/
/*Para verificar no navegador http://localhost:3000/users */

/*para fazer o servidor funcionar $ npm run dev */

/*http://localhost:3000/projeto?name=rodrigo&age=33*/ 