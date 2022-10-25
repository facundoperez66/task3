let id = location.search.slice(4);
//console.log(id);

let detailCard = document.getElementById('detail-card');

async function getData(url){
    let response = await fetch(url)
    let data = await response.json()
    printEvents(data.event)
    console.log(data);
}    
getData(`https://mh-amazing.herokuapp.com/amazing/${id}`)


function printEvents(event) {
    detailCard.innerHTML +=
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
}



