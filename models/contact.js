const {Schema, model} = require('mongoose')

const contactSchema = Schema({
    active: {type:Boolean},
    city: {type:String},
    countty:{type:String},
    name:{type:String},
    last_name:{type:String},
    adress:{type:String},
    email:{type:String},
    photo:{type:String},
    mobile:{type:String},
    contract:{type:String},
    state:{type:String},
    salary:{type:String}  
})

module.exports = model('Contact',contactSchema)