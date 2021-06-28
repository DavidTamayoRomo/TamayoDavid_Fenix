const mongoose = require('mongoose')

const dbConection = async()=>{
    try {
        
        await mongoose.connect( process.env.MONGO_ATLAS, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        } )
        console.log('Base de datos online')

    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con la base de datos')
    }
}

module.exports = {dbConection}