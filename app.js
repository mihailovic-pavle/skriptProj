const {sequelize} = require('./models')

const express = require('express')

const app = express()

const credentialsmw = require('./appmiddleware/credentials')
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const verifyMiddle = require('./appmiddleware/verify')


app.use(credentialsmw)
app.use(cors(corsOptions))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())



app.get('/', verifyMiddle.verifyJwt,(req, res) =>{
    res.sendFile('index.html', {root:'./static'})
})

app.get('/register', (req, res) =>{
    res.sendFile('register.html', {root:'./static'})
})

app.get('/login', (req, res) =>{
    res.sendFile('login.html', {root:'./static'})
})

app.use('/admin', [verifyMiddle.verifyJwt,verifyMiddle.verifyRole(1)], require("./routes/adminapp.js"))
//MOra da bude poslednje jer jebe ako je gore
app.use('/', express.static(path.join(__dirname,'static')))

app.all('*', (req,res) =>{

    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'static','404.html'))
    }else if(req.accepts('json')){
        res.json({
            'error':'404 error'
        })
    }else{
        res.type('txt').send("404 Error")
    }

})

app.listen(8000, async () => {
    await sequelize.authenticate()
})