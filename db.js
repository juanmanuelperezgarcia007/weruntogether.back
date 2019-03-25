const mysql = require('mysql')  //Siempre suele ser igual

let pool = null

let connect= (done) => {
    pool= mysql.createPool({
        host:'localhost',
        user: 'weruntog',
        password: '50EdYe09hq',
        port: 3306,
        database:'weruntog_produccion'
    })
    done()
}

let get = () =>{
    return pool
}

module.exports = {
    connect: connect,
    get: get
}