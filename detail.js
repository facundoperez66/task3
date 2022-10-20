let id = location.search.slice(4);
console.log(id);

let detailCard = document.getElementById('detail-card');

let idFiltrada = data.events.filter(data => data._id == id)
console.log(idFiltrada);
printEvents(idFiltrada, 'detail-card')

function printEvents(array,id) {
    
    document.querySelector(`#${id}`).innerHTML = ""
    array.forEach(event =>{
        document.querySelector(`#${id}`).innerHTML +=
            `
            <figure class="detailimage">
            <img src="${event.image}" alt="comidas">
            </figure>
            <article> 
            <h3>${event.name}</h3>
        </article>
        <div>
            <p>${event.description} </p>
            
        </div>
        <div><p>category:${event.category}</p></div>
        <div><p> ${event.date}</p></div>
        <div><p>place: ${event.place}</p></div>
        <div><p>capacity:${event.capacity}</p></div>
        <div><p>assistance:${event.assistance}</p></div>
        <div><p>price:${event.price}</p></div>
            `
    })
}