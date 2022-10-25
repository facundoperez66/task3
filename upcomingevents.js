//console.log(data)
const containerCards = document.getElementById(`container`)

//let actualDate = '2022-01-01'
//console.log(eventos)

//let upEvents = eventos.filter(event => event.date > actualDate )



async function getData(url){
   
    let response = await fetch(url)
    //console.log(response);
    let data = await response.json()
    console.log(data);
    const eventos = data.events
    
    
    //funcion printEvents
    eventos.forEach(printEvents)

    //const containerChecks = document.getElementById('checkBox-js')
    
    let categoriasCheckbox = new Set (eventos.map(evento => evento.category))
    
    categoriasCheckbox.forEach(createCheckBox)
    
    //funcion CreateCheckBox

    let checkboxClass = Array.from(document.querySelectorAll('.checkboxClass'))

    //let searchId = document.getElementById('searchId')
    
    checkboxClass.forEach(checkbox => checkbox.addEventListener('click',filtrarCards))

    searchId.addEventListener('input', filtrarCards)

    function filtrarCards(){
        
        let checkBoxFilitrados = checkboxFilters(eventos)
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
    //funcion searchFilters

}

function printEvents(event) {
    containerCards.innerHTML +=
    `
    <article class="card">
    <img src="${event.image}" alt="food">
    <h4>${event.name}</h4>
    <p>${event.date}</p>
    <p>${event.category}</p>
    <div class="ancorbut">
    <a href="./details.html?id=${event.id}">more info</a>
    </div>
    </article>
    `
}


const containerChecks = document.getElementById('checkBox-js')



function createCheckBox(categoria){
    containerChecks.innerHTML +=  
    `
    <label for=""> 
            <input type="checkbox" name="category" class="checkboxClass" id=""  value="${categoria}">${categoria}
            
            </label>
    `
}

let searchId = document.getElementById('searchId')


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

getData("https://mh-amazing.herokuapp.com/amazing?time=upcoming")
