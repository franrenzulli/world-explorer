const searchBtn = document.getElementById("SearchBtn")
const searchName = document.getElementById("searchName")
const searchCapital = document.getElementById("searchCapital")
const countryName = document.getElementById("countryName")
const countryFlag = document.getElementById("countryFlag")
const language = document.getElementById("language")
const continent = document.getElementById("continent")
const capital = document.getElementById("capital")
const population = document.getElementById("population")
const googlemaps = document.getElementById("googlemaps")
const neighbours = document.getElementById("neighbours")

searchByCountry = true;

searchCapital.addEventListener("click", ()=>{ 
    searchByCountry = false;
    searchCapital.style.backgroundColor = "#808579"
    searchCapital.style.color = "white";
    searchName.style.backgroundColor = "white"
    searchName.style.color = "black"
})

searchName.addEventListener("click", ()=>{
    searchByCountry = true;
    searchName.style.backgroundColor = "#808579"
    searchName.style.color = "white";
    searchCapital.style.backgroundColor = "white"
    searchCapital.style.color = "black"
})

async function updateData(data){ // This function uses the responded JSON and starts updating the HTML contents.

    countryName.textContent = `${data[0].name.official}`
    countryFlag.src = `${data[0].flags.png}`
    continent.textContent = `Continent: ${data[0].continents[0]}`
    capital.textContent = `Capital: ${data[0].capital}`
    population.textContent = `Population: ${data[0].population} habitants`
    googlemaps.href = `${data[0].maps.googleMaps}`
    googlemaps.textContent = "Go to Google Maps"

    for (const lang in data[0].languages) {
        if (data[0].languages.hasOwnProperty(lang)) {
            language.textContent = `Language: ${data[0].languages[lang]}`
            break;  // We take the first found language 
        }
    }
}

searchBtn.addEventListener('click', async () => {

    try{

        const input = document.getElementById("nameSearchInput").value // We grab from the input field the value that will be included in the endpoint

        if(searchByCountry){  // We check if the user is trying to search by country name or capital name.
            const response = await fetch(`https://restcountries.com/v3.1/name/${input}`)
            const data = await response.json();
            updateData(data)
            
        }else if(!searchByCountry){
            const response = await fetch(`https://restcountries.com/v3.1/capital/${input}`)
            const data = await response.json();
            updateData(data)
            
        }
      
        document.getElementById("nameSearchInput").value = "" // Clean the input field
      
    } catch (error) {
        console.error(error);
    }

});

