let nameH1
let surfaceSpan
let climateSpan
let diameterSpan
let terrainSpan
let orbitalPeriodSpan
let rotationPeriodSpan
let populationSpan
let planets = []
const baseUrl = `http://localhost:9001/api`;

// runs on the page load

addEventListener('DOMContentLoaded', () =>{
    nameH1 = document.querySelector('h1#name')
    surfaceSpan = document.querySelector('span#surface')
    climateSpan = document.querySelector('span#climate')
    diameterSpan = document.querySelector('span#diameter')
    terrainSpan = document.querySelector('span#terrain')
    orbitalPeriodSpan = document.querySelector('span#orbit')
    rotationPeriodSpan = document.querySelector('span#rotation')
    populationSpan = document.querySelector('span#pop')
    const searchParam = new URLSearchParams(window.location.search)
    const id = searchParam.get('id')
    console.log("searhc param id: ", id)
    getPlanet(id)
})


async function getPlanet(id){
    let planet
    try{
        response = await fetchPlanet(id)
        // push all the planets in a list
        planets.push(...response)

        planet = planets.find(item => item.id == id )
        console.log(planet)
    }catch{
        console.error(`Error fetching planet ${id}` )
    }

    renderPlanet(planet)
}

async function fetchPlanet(id){
    // let planetUrl = `${baseUrl}/films/${id}/planets`
    let planetUrl = `http://localhost:9001/api/planets`
    
    const response = await fetch(planetUrl)
    .then(res => res.json())

    return response

}



// updates the dom with API INFO
const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    surfaceSpan.textContent = planet?.surface_water
    climateSpan.textContent = planet?.climate
    diameterSpan.textContent = planet?.diameter
    terrainSpan.textContent = planet?.terrain
    populationSpan.textContent = planet?.population 
    orbitalPeriodSpan.textContent = planet?.orbital_period 
    rotationPeriodSpan.textContent = planet?.rotation_period 
   
    
}  