var express = require('express')
var router = express.Router()

let bcrypt = require('bcrypt')
const registroModel = require('../../models/registro')
const inicioModel = require('../../models/inicio')

let tokengn = require('tokengn')

router.post('/login', (req, res) => {
    console.log(req.body)
    inicioModel.login(req.body, (err, result) => {
        console.log(result[0].id)
        if (err) return console.log(err.message)
        if (result.length == 0) {
            return res.json({ error: 'usuario y/o contraseña es incorrecta' })
        }
        if (result.length == true) {
            let correcto = bcrypt.compareSync(req.body.password, result[0].password)
            console.log(correcto)
            if (correcto == true) {
                let token = tokengn({})

                inicioModel.token(token, result[0].id, (err, result) => {

                    return res.json(token)
                })
            } else {
                return res.json({ error: 'usuario y/o contraseña es incorrecta' })
            }
        }
    })
})
router.post('/loginGoogle', (req, res) => {


    inicioModel.login(req.body, (err, result) => {
        console.log(result[0].id)
        console.log(req.body.nombre);

        registroModel.updateUserGoogle({ usuario: req.body.nombre, email: req.body.email, ultimaconexion: req.body.ultimaconexion, photo: req.body.photo, creacion: req.body.creacion, token: req.body.token, id: result[0].id }, (_err, result) => {
            console.log(result)
        })
    })
})

module.exports = router;