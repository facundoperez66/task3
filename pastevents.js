console.log(data)
const containerCards = document.getElementById(`container`)
const eventos = data.events
let actualDate = '2022-01-01'

//console.log(data.events[0])
let pastEvents = eventos.filter(event => event.date < actualDate )


function printEvents(event) {
    containerCards.innerHTML +=
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
}

pastEvents.forEach(printEvents)


const containerChecks = document.getElementById('checkBox-js')

let categoriasCheckbox = new Set (eventos.map(evento => evento.category))

categoriasCheckbox.forEach(createCheckBox)

function createCheckBox(categoria){
    containerChecks.innerHTML +=  
    `
    <label for=""> 
            <input type="checkbox" name="category" class="checkboxClass" id=""  value="${categoria}">${categoria}
            
            </label>
    `
}

let checkboxClass = Array.from(document.querySelectorAll('.checkboxClass'))

//console.log(checkboxClass);

let searchId = document.getElementById('searchId')


checkboxClass.forEach(checkbox => checkbox.addEventListener('click',filtrarCards))

searchId.addEventListener('input', filtrarCards)

function filtrarCards(){
    let checkBoxFilitrados = checkboxFilters(pastEvents)
    let searchFiltrados = searchFilters(checkBoxFilitrados, searchId.value)
    if(searchFiltrados.length !== 0){
        containerCards.innerHTML = ``
    }
    searchFiltrados.forEach(printEvents)
}



function checkboxFilters(evento){
    let checkboxFiltering = checkboxClass.filter(check => check.checked).map(check => check.value)
    if(checkboxFiltering.length !== 0){
        let checkboxFiltering2 = evento.filter(event => checkboxFiltering.includes(event.category))
        return checkboxFiltering2
    }
    return evento
}

function searchFilters(array,text){
    let searchFiltering = array.filter(evento=> evento.name.toLowerCase().includes(text.toLowerCase()))
    if (searchFiltering.length === 0){
        containerCards.innerHTML= 
        `
        <h1> No hay coincidencia </h1>
        `
        return []
    }
    return searchFiltering
}
