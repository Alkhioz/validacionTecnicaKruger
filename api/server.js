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

    let response = {
        name: `${user.name} ${user.lastname}`,
        isAdmin: user.roleId === 1 ? true:false,
        isIncomplete: user.dateOfBirth === "" || user.address === "" || user.phone === ""
    }
    res.jsonp(response)
})

server.get('/getUsers', auth, isAdmin, (req, res) => {
    let users = db.user.map(user =>{
        let vaccineId = db.vaccineByUser.filter(data=>data.userId == user.id)
        let vaccine = {}
        if(vaccineId.length){
            let vaccineData = db.vaccine.filter(data=> data.id == vaccineId[0].vaccineId)
            vaccine = {
                status: true,
                vaccine: vaccineData[0].body
            }
        }else{
            vaccine = {
                status: false,
            }
        }
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
            vaccination: vaccine
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