const db = require('../db')


let newPost = ({ formularioDia, formularioHora, formularioDistancia, latitude, longitud, formularioMensaje, token }, done) => {


    db.get().query('INSERT INTO `eventos`(`formularioDia`, `formularioHora`, `formularioDistancia`, `latitude`, `longitud`, `formularioMensaje`,`fk_usuarios`) VALUES (?,?,?,?,?,?,(select `id` from usuarios where token = ?));', [formularioDia, formularioHora, formularioDistancia, latitude, longitud, formularioMensaje, token], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })
}

let paintPost = ({ lat0, lat180, lng90, lng270 }, done) => {
    console.log({ lat0, lng90, lat180, lng270 })

    db.get().query(`SELECT e.formularioDia, e.latitude, e.longitud,e.formularioHora,e.formularioDistancia,e.formularioMensaje, e.id as eventoId, u.usuario, u.token, u.id as usuarioId 
    FROM eventos as e JOIN usuarios as u 
    where e.fk_usuarios = u.id
    and e.latitude < ? 
    AND e.latitude > ? 
    AND e.longitud < ? 
    AND e.longitud > ?
    
    order by formularioDia ASC`,
        [lat0, lat180, lng90, lng270],
        (err, result) => {

            if (err) return done(err)
            done(null, result)
        })
}

let recoverComentarios = ({ fk_eventos }, done) => {
    console.log(fk_eventos)

    db.get().query('SELECT u.usuario,u.token, c.comentarios,c.id FROM `usuarios`as u JOIN`comentarios` as c WHERE `fk_eventos`=? and  c.fk_usuarios = u.id ', [fk_eventos], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })
}

let paintPostDistancia = ({ BuscadorDistancia }, done) => {

    db.get().query('SELECT  FROM `eventos` WHERE `formularioDistancia` =?', [BuscadorDistancia], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })


}

let paintPostDia = ({ buscadorDia }, done) => {

    db.get().query('SELECT * FROM `eventos` WHERE `formularioDia` =?', [buscadorDia], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })



}

let getIdEventos = (id, done) => {
    db.get().query('select e.formularioDia, e.latitude, e.longitud,e.formularioHora,e.formularioMensaje,e.formularioDistancia, e.id as eventoId, u.usuario, u.id as usuarioId from eventos as e, usuarios as u WHERE e.id = ? AND e.fk_usuarios = u.id', [id], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })
}

let saveComentarios = ({ fk_eventos, comentarios, tokenUsuario }, done) => {

    db.get().query('INSERT INTO comentarios (id, fk_eventos, comentarios, fk_usuarios) VALUES (null,?,?,(select id from usuarios where token = ?))', [fk_eventos, comentarios, tokenUsuario], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })
}

let deleteComentarios = ({ id }, done
) => {
    db.get().query('DELETE FROM `comentarios` WHERE id =?', [id], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })
}

let deletePost = ({ id }, done) => {
    console.log(id)
    db.get().query('DELETE FROM `eventos` WHERE id =?', [id], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })
}

module.exports = {
    newPost: newPost,
    paintPost: paintPost,
    paintPostDistancia: paintPostDistancia,
    paintPostDia: paintPostDia,
    getIdEventos: getIdEventos,
    saveComentarios: saveComentarios,
    recoverComentarios: recoverComentarios,
    deleteComentarios: deleteComentarios,
    deletePost: deletePost
}


