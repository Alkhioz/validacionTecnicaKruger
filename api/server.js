const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const db = require('./db.json');
const middlewares = jsonServer.defaults()
const cors = require('cors');

var corsOptions = {
    credentials: true,
    origin: "*",
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: 'accept, content-type'
};

server.use(cors(corsOptions));

const jwt = require('jsonwebtoken')

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
    let user = db.user.find(role=>{
        return role.id == req.decoded
    })
    if (user.roleId == 1){
        next()
    }else{
    res.jsonp({
            msg: 'err',
            data: {description: "user cant access this info"}
        })
    }
}

server.post('/login', (req, res) => {
    let {username, password} = req.body
    let user = db.user.find(user=>{
        return user.username === username && user.password === password
    })
    if(user === undefined){
        res.jsonp({
            msg: 'err',
            data: {description: 'Usuario o contraseña incorrectos.'}
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

    let response = {
        name: `${user.name} ${user.lastname}`,
        isAdmin: user.roleId === 1 ? true:false,
        isIncomplete: user.dateOfBirth === "" || user.address === "" || user.phone === ""
    }
    res.jsonp(response)
})

server.get('/getUsers', auth, isAdmin, (req, res) => {
    let users = db.user.map(user =>{
        let data = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            dni: user.dni,
            mail: user.email,
            username: user.username,
            address: user.address,
            phone: user.phone,
            birth: user.dateOfBirth,
            isAdmin: user.roleId === 1 ? true : false,
            vaccination: user.vaccine === ""?{status:false}:{status:true, vaccine:user.vaccine}
        }
        return data
    })
    res.jsonp({
        msg: 'ok',
        data: {users}
    });
})


server.use(middlewares)
server.use(auth)
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})