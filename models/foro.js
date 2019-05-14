const db = require('../db')

let paintQuestions = (done) => {
    db.get().query('SELECT `id`,`pregunta`,`opcion1`,`opcion2`,`opcion3`,`opcion4` FROM `foro` WHERE 1 ', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}


let getIdEventos = (id, done) => {
    db.get().query('SELECT `id`,`pregunta`,`opcion1`,`opcion2`,`opcion3`,`opcion4` FROM `foro` WHERE id=? ',[id], (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

let saveRespuesta = ({fk_respuesta,respuesta},done) => {
    db.get().query('INSERT INTO respueta (id, fk_respuesta , respuesta) VALUES (null,?,?)',[fk_respuesta, respuesta], (err,result)=>{

        if (err) return done(err)
        done(null, result)
    })
}

let saveComentarios = ({fk_respuesta,comentario,tokenUsuario},done) => {
    db.get().query('INSERT INTO comentariosforo (id, fk_respuesta, comentario, fk_usuarios) VALUES (null,?,?,(select id from usuarios where token = ?))',[fk_respuesta, comentario,tokenUsuario], (err,result)=>{

        if (err) return done(err)
        done(null, result)
    })
}

let recoverComentariosForo = ({ fk_respuesta }, done) => {
    console.log(fk_respuesta)

    db.get().query('SELECT u.usuario,u.token, c.comentario,c.id FROM `usuarios`as u JOIN `comentariosforo` as c WHERE `fk_respuesta`=? and c.fk_usuarios = u.id ', [fk_respuesta], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })
}

let loadData = (fk_respuesta,done) => {
    
    db.get().query('SELECT r.respuesta, COUNT(*) as contador FROM respueta as r WHERE fk_respuesta=? GROUP BY r.respuesta ',[fk_respuesta], (err,result)=>{

        if (err) return done(err)
        done(null, result)
    })
}




module.exports = {
    saveComentarios:saveComentarios,
    paintQuestions: paintQuestions,
    saveRespuesta:saveRespuesta,
    getIdEventos: getIdEventos,
    loadData:loadData,
    recoverComentariosForo:recoverComentariosForo
  

}