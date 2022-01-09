const {sequelize} = require('./models')

const express = require('express')

const app = express()

const credentialsmw = require('./appmiddleware/credentials')
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

app.use(credentialsmw)
app.use(cors(corsOptions))

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())

app.use('/', express.static(path.join(__dirname,'static')))

app.use('/register', require("./routes/register.js"))
app.use('/login', require("./routes/login.js"))

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

app.listen(8001, async () => {
    await sequelize.authenticate()
})