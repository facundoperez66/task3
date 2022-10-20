console.log(data)
const container = document.getElementById(`container`)

//console.log(data.events[0])


function filtrarFechas(array,fecha){
    let filtrados = []
    for(let i = 0; i < array.length; i++){
        if( array[i].date < fecha ){
            filtrados.push(array[i])
        }
    }
    return filtrados
}

const fechas = filtrarFechas( data.events, `2022-01-01`)



function printEvents(array,id) {
    
    document.querySelector(`#${id}`).innerHTML = ""
    array.forEach(event =>{
        document.querySelector(`#${id}`).innerHTML +=
            `
    <article class="card">
    <img src="${event.image}" alt="food">
    <h4>${event.name}</h4>
    <p>${event.date}</p>
    <p>${event.category}</p>
    <div class="ancorbut">
    <a href="./details.html?id=${event._id}">more info</a>
    </div>
    </article>
            `
    })
}
printEvents(fechas,'container')



//const checkBoxs = document.getElementById( 'checkBox-js' )

let categorias = new Set(data.events.map(element=> element.category))

//console.log(categorias);

categorias = [...categorias]

//console.log(categorias);

let printCategories = (array,id) => {
    document.querySelector(`#${id}`).innerHTML = ""
    array.forEach(cat =>{
        document.querySelector(`#${id}`).innerHTML +=
            `
            <label for="${cat.toLowerCase()}">${cat.toUpperCase()} 
            <input type="checkbox" name="category" class="checkbox" id="${cat.toLowerCase()}"  value="${cat.toLowerCase()}">
            
            </label>
            `
    })
   
    
}
printCategories(categorias,'checkBox-js')

let arrayEventos = categorias.map(cadaCategoria=> {
  let arrayFiltrado = data.events.filter(cadaEvento => cadaEvento.category === cadaCategoria)
    return arrayFiltrado
})
//console.log(arrayEventos);
//console.log(categories);

let checks = document.querySelectorAll(`.checkbox`) // elquery selector tambien puede tomar la clase "checkbox"
console.log(checks);

for(let element of checks){
    element.addEventListener(
        'click',
        (event)=> search(event,fechas)
    )
}

function search(ev,array){
    //console.log(ev.target.checked);
    //console.log(ev.target.value);
    
    
    let checks = document.querySelectorAll(`.checkbox:checked`)
    console.log(checks);
    
    let filterArray = []
    checks.forEach(cadaCategoria =>{
        let newArray = array.filter(cadaEvento => cadaEvento.category.toLowerCase()=== cadaCategoria.value)
        filterArray = filterArray.concat(newArray)
        
    })
    
    if(filterArray.length === 0){
        filterArray = array
    }
    
    printEvents( filterArray,'container')
    
    

}
const inputSearch = document.getElementById( 'buscador' )
 
inputSearch.addEventListener('keyup', eventParameter =>{
    let inputUser = eventParameter.target.value
    let filter = fechas.filter(objectEvents => objectEvents.category.toLocaleLowerCase().includes(inputUser))

    container.innerHTML = ""
    printEvents( filter,'container')
})
