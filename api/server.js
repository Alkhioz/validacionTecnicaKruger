const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const db = require('./db.json');
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)

server.post('/login', (req, res) => {
    let {username, password} = req.body
    console.log({username, password})
})

server.get('/user/:id', (req, res) => {
    let user = db.user.find(user => {
        return user.id == req.params.id
    })
    let role = db.roleByUser.find(role =>{
        return role.userId == user.id
    })

    let response = {
        name: `${user.name} ${user.lastname}`,
        isAdmin: role.roleId === 1 ? true:false
    }
    res.jsonp(response)
})

server.use(middlewares)
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})