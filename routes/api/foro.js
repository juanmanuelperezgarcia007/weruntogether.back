var express = require('express');
var router = express.Router();
const foroModel = require('../../models/foro')

router.get('/', (req, res) => {
    foroModel.paintQuestions((err, rows) => {
        if (err) return console.log(err.message)
        res.json(rows)
    })
})
 

router.get('/pregunta/:id', (req, res) => {
    foroModel.getIdEventos(req.params.id, (err, rows) => {
        
        if (err) return console.log(err.message)
        res.json(rows)
    })
})

router.post('/guardarComentariosForo', (req, res) => {
    foroModel.saveComentarios(req.body, (err, rows) => {

        if (err) return console.log(err.message)
        res.json(rows)
    })
})

router.post('/respuesta', (req,res)=>{
 
    foroModel.saveRespuesta(req.body,(err,rows)=>{

        if (err) return console.log(err.message)
        res.json(rows) 
    })
    
})

router.post('/paintComentariosForo', (req, res) => {
    foroModel.recoverComentariosForo(req.body, (err, rows) => {
        console.log(req.body)
        if (err) return console.log(err.message)
        res.json(rows)
    })
})

router.post('/datos', (req,res)=>{
    console.log(req.body,)
  
    foroModel.loadData(req.body.fk_respuesta,(err,rows)=>{

        if (err) return console.log(err.message)
        res.json(rows) 
    })
    
})

module.exports = router;
