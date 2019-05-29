var express = require('express');
var router = express.Router();
const registroModel = require('../../models/registro')


router.post('/newUser', (req, res) => {
    console.log(req.body)
    registroModel.newUsuario(req.body, (err, rows) => {
        if (err) return res.json( err.message )
        res.json(rows)
    })
})

router.post('/edit', (req, res) => {
    console.log(req.body)
    registroModel.getByUser(req.body.token, (err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows[0])
    })

})

router.post('/update', (req, res) => {
    console.log(req.body)
    registroModel.updateUser(req.body, (err, rows) => {
        if (err) return console.log(err.message)
        res.json('actualizado')

    })
})

router.post('/delete', (req, res) => {
    console.log(req.body)
    registroModel.deleteUser(req.body.token, (err, rows) => {
        if (err) return console.log(err.message)
        res.json('Borrrado')
    })

})


module.exports = router;
