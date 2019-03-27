const db = require('../db')

let login = (usuario, done) => {
    db.get().query('select * from usuarios where usuario = ?', [usuario], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}


let token = (token, id, done) => {
    console.log('token')
    db.get().query('update usuarios set token = ?  WHERE id= ?', [token, id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}


module.exports = {
    login: login,
    token: token
}