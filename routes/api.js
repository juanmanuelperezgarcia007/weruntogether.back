var express = require('express');
var router = express.Router();
var carrerasRouter = require('./api/carreras')
var registroRouter = require('./api/registro')
var inicioRouter= require('./api/inicio')
var quedadasRouter= require('./api/quedadas')
router.use('/carreras',carrerasRouter)
router.use('/registro',registroRouter)
router.use('/inicio',inicioRouter)
router.use('/quedadas',quedadasRouter)
module.exports = router;
