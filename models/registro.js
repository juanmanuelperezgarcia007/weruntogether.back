const db = require('../db')
let bcrypt = require("bcrypt")

let newUsuario = ({ nombre, apellidos, email, usuario, password, provincia, poblacion }, done) => {

    console.log(password)
    let claveEncriptada = bcrypt.hashSync(password, 10)

    db.get().query('insert into usuarios (nombre, apellidos, email, usuario, password, provincia, poblacion) values (?,?,?,?,?,?,?)', [nombre, apellidos, email, usuario, claveEncriptada, provincia, poblacion], (err, result) => {
        console.log('ENTRA')
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

let updateUser = ({ nombre, apellidos, email, usuario, provincia, poblacion, token }, done) => {
    
    db.get().query('UPDATE usuarios set nombre =?,apellidos=?, email=?, usuario=?,provincia=?, poblacion=? where token=?', [nombre, apellidos, email, usuario, provincia, poblacion, token], (err, result) => {
        console.log('ENTRA')
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
    deleteUser: deleteUser
}