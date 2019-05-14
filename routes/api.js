var express = require('express');
var router = express.Router();
var carrerasRouter = require('./api/carreras')
var registroRouter = require('./api/registro')
var inicioRouter= require('./api/inicio')
var quedadasRouter= require('./api/quedadas')
var foroRouter= require('./api/foro')
router.use('/carreras',carrerasRouter)
router.use('/registro',registroRouter)
router.use('/inicio',inicioRouter)
router.use('/quedadas',quedadasRouter)
router.use('/foro',foroRouter)
module.exports = router;
