var express = require('express');
var router = express.Router();
const carrerasModel = require('../../models/carreras')

router.get('/WeekRace', (req, res) => {
    carrerasModel.getWeekRaces((err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)
    })
})

router.post('/estrella', (req, res) => {
    carrerasModel.getFavorites(req.body, (err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)

    })
})

router.post('/filtrarCarreras', (req, res) => {
    carrerasModel.getCarrerasFilters(req.body, (err, rows) => {
        console.log(req.body)
        if (err) return console.log(err.message)
        res.json(rows)
        console.log(res)
    })

})

router.post('/carrerasFavoritas', (req, res) => {
    carrerasModel.postFavoritos(req.body, (err, rows) => {
        console.log(req.body)
        if (err) return console.log(err.message)
        res.json(rows)
    })

})



module.exports = router;
