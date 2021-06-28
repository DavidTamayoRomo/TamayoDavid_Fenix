const { response } = require('express')
const Usuario = require('../models/user')


var SEED = process.env.SEED;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// ==========================================
//  GET users
// ==========================================
const usuariosGet = async (req, res) => {
    // const query = req.query
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            ok: true,
            msg: 'GET',
            usuarios
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
//  CREATE Users
// ==========================================
const usaurioPost = async (req, res) => {
    const body = req.body
    const usuario = new Usuario(body)

    try {
        await bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
            usuario.password = hash
        });
        await usuario.save();
        res.status(200).json({
            ok: true,
            msg: 'POST',
            usuario
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
const usuarioPut = async (req, res) => {

    const id = req.params.id;
    const body = req.body

    try {
        const usuario = await Usuario.findByIdAndUpdate(id, body)

        res.status(200).json({
            ok: true,
            msg: 'PUT',
            usuario
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
const usuarioDelete = async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findByIdAndDelete(id)
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



// ==========================================
//  Autenticación -token
// ==========================================
const login = (req, res) => {

    var body = req.body;

    


    Usuario.findOne({ nombre: body.nombre }, (err, usuarioDB) => {
        console.log(body.nombre)
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }
        if (body.password != usuarioDB.password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear un token!!!
        usuarioDB.password = ':)';

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });

    })


}



module.exports = {
    usuariosGet,
    usuarioPut,
    usaurioPost,
    usuarioDelete,
    login
}