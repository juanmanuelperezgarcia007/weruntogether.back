const db = require('../db')
let bcrypt = require("bcrypt")

let newUsuario = ({
    email,
    usuario,
    password
}, done) => {

    console.log(password)
    let claveEncriptada = bcrypt.hashSync(password, 10)

    db.get().query('insert into usuarios ( email, usuario, password) values (?,?,?,?,?,?,?)', [email, usuario, claveEncriptada], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}

let newUsuarioGoogle = ({
    email,
    usuario,
    ultimaconexion,
    photo,
    creacion
}, done) => {


    db.get().query('insert into usuarios ( email, usuario, ultimaVisita, photo, fechaCreacion) values (?,?,?,?,?)', [email, usuario, ultimaconexion, photo, creacion], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}

let getByUser = (token, done) => {
    db.get().query('select * from usuarios where token=?', [token], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}

let updateUser = ({
    email,
    usuario,
    token
}, done) => {

    db.get().query('UPDATE usuarios set email=?, usuario=? where email=?', [email, usuario, token], (err, result) => {
        console.log('ENTRA')
        if (err) return done(err)
        done(null, result)


    })
}

let updateUserGoogle = ({
    usuario,
    email,
    ultimaconexion,
    photo,
    creacion,
    token,
    id
}, done) => {

    db.get().query('UPDATE usuarios set usuario=?, email=?, ultimaVisita=?, photo=?, fechaCreacion=?, token=? where id=?', [usuario, email, ultimaconexion, photo, creacion, token, id], (err, result) => {

        if (err) return done(err)
        done(null, result)

    })
}

let deleteUser = (token, done) => {
    console.log(token)
    db.get().query('DELETE FROM usuarios WHERE token =? ', [token], (err, result) => {
        if (err) return done(err)
        done(null, result)

    })
}


module.exports = {
    newUsuario: newUsuario,
    getByUser: getByUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    newUsuarioGoogle: newUsuarioGoogle,
    updateUserGoogle: updateUserGoogle
}