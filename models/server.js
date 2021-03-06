const express = require('express')
var cors = require('cors')
const { dbConection } = require('../databases/config')

class Server {
    constructor() {
        this.app = express()
        this.usariosPath='/api/user'
        this.contactPath='/api/contact'
        //Conectar base de datos
        this.conectarBD()
        this.middlewares()
        this.routes()
        
    }

    async conectarBD(){
        await dbConection()
    }

    middlewares(){
        //cors
        this.app.use(cors())
        //Lectura y parceo 
        this.app.use(express.json())
        
    }
    routes() {
        this.app.use(this.usariosPath,require('../routes/users'))
        this.app.use(this.contactPath,require('../routes/contacts'))
    }
    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log('Servidor en', process.env.PORT)
        })
    }
}

module.exports = Server;