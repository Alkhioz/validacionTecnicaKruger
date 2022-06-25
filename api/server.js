const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const db = require('./db.json');
const middlewares = jsonServer.defaults()

var jwt = require('jsonwebtoken')

server.use(jsonServer.bodyParser)

const secret = "thisIsTheSecretCode224411222.////####"

const createToken = (data) => jwt.sign({data}, secret, { expiresIn: '1h' })

const validateToken = (token) => jwt.verify(token, secret, (err, decoded)=>{
    if(err)
        return false
    return decoded
})

const auth = (req, res, next) => {
    let decoded = validateToken(req.headers["access-token"])
    if (decoded) {
        req.decoded = decoded.data
        next()
    } else {
        res.jsonp({
            msg: 'err',
            data: {description: 'invalid token'}
        });
    }
}

const isAdmin = (req, res, next) => {
    let user = db.roleByUser.find(role=>{
        return role.userId == req.decoded
    })
    if (user.roleId == 1)
        next()
    res.jsonp({
            msg: 'err',
            data: {description: "user cant access this info"}
        })
}

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

server.get('/getCurrentUserData', auth, (req, res) => {

    let user = db.user.find(user => {
        return user.id == req.decoded
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

server.get('/getUsers', auth, isAdmin, (req, res) => {
    let users = db.user.map(user =>{
        let data = {
            name: user.name,
            lastname: user.lastname,
            dni: user.dni,
            mail: user.email,
            username: user.username,
            address: user.address,
            phone: user.phone,
            birth: user.dateOfBirth
        }
        return data
    })
    res.jsonp({
        msg: 'ok',
        data: {users}
    });
})

server.post('addUser', (req, res) => {
    
})

server.use(middlewares)
server.use(auth)
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})