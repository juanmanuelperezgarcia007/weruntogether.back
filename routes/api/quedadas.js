var express = require('express')
var router = express.Router()
const quedadasModel = require('../../models/quedadas')
const geoutils=require('geolocation-utils')

router.post('/agregarPost',(req,res)=>{
    console.log(req.body)
    quedadasModel.newPost(req.body,(err,rows)=>{
        if(err) return console.log (err.message)
        res.json(rows)
    })
}),
router.post('/allPost',(req,res)=>{
    console.log(req.body.lat)
    console.log(req.body.lon)
    let pos0 = geoutils.moveTo({ lat: req.body.lat, lon:req.body.lon }, { heading: 0, distance: 20000 })
    let pos90 = geoutils.moveTo({ lat: req.body.lat, lon: req.body.lon }, { heading: 90, distance: 20000 })
    let pos180 = geoutils.moveTo({ lat: req.body.lat, lon: req.body.lon }, { heading: 180, distance: 20000 })
    let pos270 = geoutils.moveTo({ lat: req.body.lat, lon: req.body.lon }, { heading: 270, distance: 20000 })

    let lat0=  pos0.lat
    let lng90= pos90.lon
    let lat180= pos180.lat
    let lng270= pos270.lon

    

    quedadasModel.paintPost({lat0,lng90,lat180,lng270,},(err,rows)=>{
    
        if(err) return console.log (err.message)
        res.json(rows)
    })
})

router.post('/filtrarPostDistancia',(req,res)=>{
    console.log(req.body)
    quedadasModel.paintPostDistancia(req.body,(err,rows)=>{
        
        if(err) return console.log (err.message)
        res.json(rows) 
    })
})

router.post('/filtrarPostDate',(req,res)=>{
    console.log(req.body)
    quedadasModel.paintPostDia(req.body,(err,rows)=>{
        if(err) return console.log (err.message)
        res.json(rows) 
    })
})

router.get('/comentarios/:id',(req,res)=>{

    quedadasModel.getIdEventos(req.params.id,(err,rows)=>{
            
        if(err) return console.log (err.message)
        res.json(rows) 
    })
})

router.post('/guardarComentarios',(req,res)=>{
    quedadasModel.saveComentarios(req.body,(err,rows)=>{
            
        if(err) return console.log (err.message)
        res.json(rows) 
    })
})

router.post('/paintComentarios',(req,res)=>{
    quedadasModel.recoverComentarios(req.body,(err,rows)=>{
        console.log(req.body)
        if(err) return console.log (err.message)
        res.json(rows) 
    })
})

router.post('/deleteComentario',(req,res)=>{
    quedadasModel.deleteComentarios(req.body,(err,rows)=>{
        console.log(req.body)
        if(err) return console.log (err.message)
        res.json(rows) 
    })
})

router.post('/deletePost',(req,res)=>{
    quedadasModel.deletePost(req.body,(err,rows)=>{
        console.log(req.body)
        if(err) return console.log (err.message)
        res.json(rows) 
    })
})


module.exports = router;