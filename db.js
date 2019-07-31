const mysql = require('mysql')  //Siempre suele ser igual

let pool = null

//local

let connect = (done) => {
    pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: 3306,
        database: 'weruntogether'
    })
    done()
}

// internet

// let connect = (done) => {
//     pool = mysql.createPool({
//         host: 'localhost',
//         user: 'weruntog_admin',
//         password: 'Erika007',
//         port: 3306,
//         database: 'weruntog_produccion'
//     })
//     done()
// }

let get = () => {
    return pool
}

module.exports = {
    connect: connect,
    get: get
}