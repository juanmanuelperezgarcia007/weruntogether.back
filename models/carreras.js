const db = require('../db')

let getWeekRaces = (done) => {
    db.get().query('SELECT * FROM `races` WHERE date > CURRENT_DATE AND date < DATE_ADD(CURRENT_DATE, INTERVAL 3 DAY ) ', (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

// db.get().query('INSERT INTO `eventos`(`formularioDia`, `formularioHora`, `formularioDistancia`, `latitude`, `longitud`, `formularioMensaje`,`fk_usuarios`) VALUES (?,?,?,?,?,?,(select `id` from usuarios where token = ?));', [formularioDia, formularioHora, formularioDistancia, latitude, longitud, formularioMensaje, token], (err, result) => {


let getFavorites = ({ token }, done) => {
    db.get().query('SELECT id_Carreras FROM carrerasfavoritos where fk_usuarios = (select `id` from usuarios where token = ?)', [token], (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

let postFavoritos = ({ id_Carreras, token }, done) => {
    db.get().query('insert into carrerasfavoritos(id_Carreras, fk_usuarios) values (?,(select `id` from usuarios where token = ?)) ', [id_Carreras, token], (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

let getCarrerasFilters = ({ min = -1, max = -1, date = null, type = null, city = null, province = null }, done) => {
    let query = 'select * from races where 1=1 '
    arrFiltros = []



    max = parseInt(max)
    min = parseInt(min)



    if (!isNaN(min) && min != -1) {
        query += ' and distance >= ? '
        arrFiltros.push(parseInt(min))
    }
    if (!isNaN(max) && max != -1) {
        query += 'and distance <= ? '
        arrFiltros.push(parseInt(max))
    }
    query += "AND DATE>CURRENT_DATE "
    if (date != '' && date != null) {
        query += ' and date = ? '
        arrFiltros.push(date)
    }

    if (type != '' && type != null) {
        query += ' and type = ? '
        arrFiltros.push(type)
    }

    if (city != '' && city != null) {
        query += ' and city = ? '
        arrFiltros.push(city)
    }
    if (province != '' && province != null) {
        query += ' and province = ? '
        arrFiltros.push(province)
    }


    query += ' ORDER BY DATE ASC LIMIT 20  '
    // console.log(query)
    // console.log(arrFiltros)

    db.get().query(query, arrFiltros, (err, rows) => {
        if (err) return done(err)
        done(null, rows)
    })
}

let deleteFavoritos = ({ id_Carreras, token }, done) => {

    db.get().query('DELETE FROM carrerasfavoritos WHERE id_Carreras= ? AND fk_usuarios= (select id from usuarios where token = ?)', [id_Carreras, token], (err, result) => {

        if (err) return done(err)
        done(null, result)
    })
}


module.exports = {
    getWeekRaces: getWeekRaces,
    getCarrerasFilters: getCarrerasFilters,
    postFavoritos: postFavoritos,
    getFavorites: getFavorites,
    deleteFavoritos: deleteFavoritos,
}