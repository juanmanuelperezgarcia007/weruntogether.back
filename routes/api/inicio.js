var express = require('express')
var router = express.Router()

let bcrypt = require('bcrypt')

const inicioModel = require('../../models/inicio')

let tokengn = require('tokengn')

router.post('/login', (req, res) => {
    inicioModel.login(req.body.usuario, (err, result) => {
        console.log(result)
        if (err) return console.log(err.message)
        if (result.length == 0) {
            return res.json({ error: 'usuario y/o contraseña es incorrecta' })
        }
        if (result.length == 1) {
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

module.exports = router;