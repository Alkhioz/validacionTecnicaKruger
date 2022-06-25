const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const db = require('./db.json');
const middlewares = jsonServer.defaults()

var jwt = require('jsonwebtoken')

server.use(jsonServer.bodyParser)

const secret = "thisIsTheSecretCode224411222.////####"

const createToken = (data) => jwt.sign({data}, secret, { expiresIn: '1h' })

server.post('/login', (req, res) => {
    let {username, password} = req.body
    let user = db.user.find(user=>{
        return user.username === username && user.password === password
    })
    if(user === undefined){
        res.jsonp({
            msg: 'err',
            data: {description: 'invalid user or password'}
        });
    }else{
        let token = createToken(user.id)
        res.jsonp({
            msg: 'ok',
            data: {token}
        });
    }
    
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