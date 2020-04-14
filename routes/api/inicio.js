var express = require('express');
var router = express.Router();
var moment = require('moment');

let bcrypt = require('bcrypt');
const registroModel = require('../../models/registro');
const inicioModel = require('../../models/inicio');

let tokengn = require('tokengn');

router.post('/login', (req, res) => {
    console.log(req.body);
    inicioModel.login(req.body, (err, result) => {
        console.log(result[0].id);
        if (err) return console.log(err.message);
        if (result.length == 0) {
            return res.json({
                error: 'usuario y/o contraseña es incorrecta'
            });
        }
        if (result.length == true) {
            let correcto = bcrypt.compareSync(req.body.password, result[0].password);
            console.log(correcto);
            if (correcto == true) {
                let token = tokengn({});

                inicioModel.token(token, result[0].id, (err, result) => {

                    return res.json(token);
                });
            } else {
                return res.json({
                    error: 'usuario y/o contraseña es incorrecta'
                });
            }
        }
    });
});
router.post('/loginGoogle', (req, res) => {

    let ultimaconexion = req.body.ultimaconexion;
    ultimaconexion = moment(ultimaconexion).format("YYYY/MM/DD")
    let creacion = req.body.creacion;
    creacion = moment(creacion).format("YYYY/MM/DD")

    inicioModel.login(req.body.email, (err, result) => {
        const password = result.password === null ? null : 'ok';
        if (result) {

            registroModel.updateUserGoogle({
                usuario: req.body.nombre,
                email: req.body.email,
                ultimaconexion: ultimaconexion,
                photo: req.body.photo,
                creacion: creacion,
                token: req.body.token,
                id: result[0].id
            }, (_err, result) => {

            })


        } else {
            registroModel.newUsuarioGoogle({
                usuario: req.body.nombre,
                email: req.body.email,
                ultimaconexion: ultimaconexion,
                photo: req.body.photo,
                creacion: creacion,
                token: req.body.token,
            }, (err, result) => {
                if (err) return res.json(err.message)
                res.json(result.affectedRows)
            })


        };
        if (err) return console.log(err.message)
        res.json(password)
    })
})


module.exports = router;