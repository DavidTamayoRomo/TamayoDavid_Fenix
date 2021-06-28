const {Schema, model} = require('mongoose')

const userSchema = Schema({
    nombre: {type:String},
    password: {type:String},
    active: {type:Boolean}
})

module.exports = model('User',userSchema)