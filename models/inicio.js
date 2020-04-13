const db = require('../db')

let login = (email, done) => {
    db.get().query('select * from usuarios where email = ?', [email], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}


let token = (token, id, done) => {
    db.get().query('update usuarios set token = ?  WHERE id= ?', [token, id], (err, result) => {
        if (err) return done(err)
        done(null, result)
    })
}


module.exports = {
    login: login,
    token: token
}