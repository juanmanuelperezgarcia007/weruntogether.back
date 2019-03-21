const db= require('../db')

let getWeekRaces= (done)=>{
    db.get().query('SELECT * FROM `races` WHERE date > CURRENT_DATE AND date < DATE_ADD(CURRENT_DATE, INTERVAL 3 DAY ) ', (err,rows)=>{
        if(err) return done(err)
        done (null,rows)
    })
}

let getCarrerasFilters=({min = -1,max =-1, date= null, type= null, city= null}, done)=>{
    let query = 'select * from races where 1=1 '
    arrFiltros=[]

    console.log(max, min,date , type, city)

    max = parseInt(max)
    min = parseInt(min)

    

    if(!isNaN(min) && min!=-1){
        query +=' and distance >= ? '
        arrFiltros.push(parseInt(min))
    }
    if(!isNaN(max) && max!=-1){
        query +='and distance <= ? '
        arrFiltros.push(parseInt(max))
    }
    query +="AND DATE>CURRENT_DATE "
    if(date !='' && date!=null){
        query +=' and date = ? ' 
        arrFiltros.push(date)
    }

    if(type != '' && type!=null){
        query +=' and type = ? '
        arrFiltros.push(type)
    }

    if(city != '' && city!=null){
        query +=' and city = ? '
        arrFiltros.push(city)
    }
    

    query +=  ' ORDER BY DATE ASC LIMIT 20  '
    console.log (query)
    console.log (arrFiltros)

    db.get().query(query,arrFiltros,(err,rows)=>{
        if(err) return done(err)
        done (null,rows)
    })
}



module.exports= {
    getWeekRaces:getWeekRaces,
    getCarrerasFilters
}