const { response } = require('express')
const Contacto = require('../models/contact')


// ==========================================
//  GET contacts
// ==========================================
const contactosGet = async (req, res) => {
    // const query = req.query
    try {
        const contactos = await Contacto.find();
        res.status(200).json({
            ok: true,
            msg: 'GET',
            contactos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador ',
        })
    }


}

// ==========================================
//  CREATE 
// ==========================================
const contactPost = async (req, res) => {
    const body = req.body
    const contact = new Contacto(body)

    try {
        
        await contact.save();
        res.status(200).json({
            ok: true,
            msg: 'POST',
            contact
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador ',
        })
    }


}

// ==========================================
//  UPDATE user
// ==========================================
const contactPut = async (req, res) => {

    const id = req.params.id;
    const body = req.body

    try {
        const contact = await Contacto.findByIdAndUpdate(id, body)

        res.status(200).json({
            ok: true,
            msg: 'PUT',
            contact
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador ',
        })
    }


}

// ==========================================
//  DELETE Users
// ==========================================
const contactDelete = async (req, res) => {
    const id = req.params.id;

    try {
        const contact = await Contacto.findByIdAndDelete(id)
        res.status(200).json({
            ok: true,
            msg: 'DELETE',
            id
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador ',
        })
    }

   
}


module.exports = {
    contactosGet,
    contactPost,
    contactPut,
    contactDelete
}

