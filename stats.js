const eventStadistics = document.getElementById('container-td1')
const upcoming = document.getElementById('container-td2')
const past = document.getElementById('container-td3')

async function getData(){
    try{
    let responsepast = await fetch("https://mh-amazing.herokuapp.com/amazing?time=past")
    let datapast = await responsepast.json()
    
    const eventosPasados = datapast.events
    

    let responseup = await fetch("https://mh-amazing.herokuapp.com/amazing?time=upcoming")
    let dataup = await responseup.json()
    
    const eventosFuturos = dataup.events
    console.log(eventosFuturos);
    let estadisticasEventos = eventosPasados.map(evento=>{
        let attendance = evento.assistance / evento.capacity * 100
        let result = {attendance, capacity: evento.capacity, name : evento.name}
        return result
    })
    //console.log(estadisticasEventos);

    estadisticasEventos.sort((a,b)=> a.attendance - b.attendance)
    console.log(estadisticasEventos);

    let hporcentage = estadisticasEventos[estadisticasEventos.length - 1]
    let lporcentage = estadisticasEventos[0]

    estadisticasEventos.sort((a,b)=> a.capacity - b.capacity)

    let mayorCapacidad = estadisticasEventos[estadisticasEventos.length - 1]


    eventStadistics.innerHTML += `
                <tr>
                    <td>${hporcentage.name}</td>
                    <td>${lporcentage.name}</td>
                    <td>${mayorCapacidad.name}</td>
                </tr>
    
    `
    
    let estadisticasFuturas = {}
    eventosFuturos.forEach(evento => {
        let ganancia = evento.estimate * evento.price
        let categoria = evento.category
       
        let estimado = evento.estimate
        let capacidad = evento.capacity 
        let attendance = estimado / capacidad * 100                          // declarar variables estimate y capacity y cuando
        if (estadisticasFuturas[categoria]) {                   // este por imprimirlo hago la opreacion de imprimir y mmultiplicar
            estadisticasFuturas[categoria].ganancia += ganancia
        }else {
            estadisticasFuturas[categoria] = {ganancia}
        }
    })

    for(let category in estadisticasFuturas){
        let ganancia = estadisticasFuturas[category].ganancia
        upcoming.innerHTML += `
        <tr>
            <td>${category}</td>
            <td>${ganancia}</td>
            <td></td>
        </tr>

    `
    }
    //console.log(estadisticasFuturas);

    let estadisticasPasadas = {}
    eventosPasados.forEach(evento => {
        let ganancia = evento.assistance * evento.price
        let categoria = evento.category
        let attendance = evento.assistance *100 / evento.capacity 
        if (estadisticasPasadas[categoria]) {                   
            estadisticasPasadas[categoria].ganancia += ganancia
        }else {
            estadisticasPasadas[categoria] = {ganancia}
        }
    })

    for(let category in estadisticasPasadas){
        let ganancia = estadisticasPasadas[category].ganancia
        past.innerHTML += `
        <tr>
            <td>${category}</td>
            <td>${ganancia}</td>
            <td></td>
        </tr>

    `
    }
    

    console.log(estadisticasPasadas);
    


}catch(error){console.log(error);}}

getData()

