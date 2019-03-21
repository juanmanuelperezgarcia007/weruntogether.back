var express = require('express');
var router = express.Router();
const carrerasModel=require('../../models/carreras')

router.get('/', (req,res)=>{
    carrerasModel.getWeekRaces((err,rows)=>{
        res.json(rows)
    })
})

router.post('/filtrarCarreras',(req,res)=>{
    carrerasModel.getCarrerasFilters(req.body,(err,rows)=>{
        console.log(err)
        res.json(rows)
    })
  
})



module.exports = router;
