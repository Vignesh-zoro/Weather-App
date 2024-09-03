/* Declare the name for API KEY & URL */
var API_KEY = "636976dd73cb1e6324347190e7f06515"
var BASC_URL = "https://api.openweathermap.org/data/2.5/"
/* Declare the variable for Lantitude & Longitude */
var lon, lat
/* Declare the Input Values of Weather App */
var city = document.getElementById("city")
var temp = document.querySelector(".temp")
var Cname = document.getElementById("name")
var wind = document.querySelector(".wind")
var pres = document.querySelector(".pres")
var hum = document.querySelector(".hum")
var Visit=document.querySelector(".visit")
const Icons = document.querySelector(".weather-icon")
/* Create a Function For Latitude and Longitude */
function getCurrent() {
    navigator.geolocation.getCurrentPosition(async (result) => {
        const vig = result.coords
        lon = vig.longitude
        lat = vig.latitude
        console.log({ "lon": lon, "lat": lat })
    })
}
getCurrent()
/* Create a Async Function For Easier to Work With API Codes */
async function search() {

    const data = await fetch(`${BASC_URL}weather?q=${city.value}&appid=${API_KEY}`)
    console.log(data)
    /* If Condition For Any Error Message Will Be Show */
    if (data.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else {
        if (data.status == 200) {

            const info = await data.json()
            console.log(info)
            /* Declare the API Value For InnerHTML of Variables */
            Cname.innerHTML = info.name
            temp.innerHTML = Math.round(info.main.temp) + "°C"
            wind.innerHTML = info.wind.speed + "km/h"
            pres.innerHTML = info.main.pressure
            hum.innerHTML = info.main.humidity + "%"
            Visit.innerHTML=info.weather[0].description
            /* Climate Will be Change The Images Will Be Appeard Using The If Condition */
            if (info.weather[0].main == "Clouds") {
                Icons.src = "images/clouds.png"
            }
            else if (info.weather[0].main == "Clear") {
                Icons.src = "images/clear.png"
            }
            else if (info.weather[0].main == "Rain") {
                Icons.src = "images/rain.png"
            }
            else if (info.weather[0].main == "Drizzle") {
                Icons.src = "images/drizzle.png"
            }
            else if (info.weather[0].main == "Mist") {
                Icons.src = "images/mist.png"
            }
            else if (info.weather[0].main == "Snow") {
                Icons.src = "images/snow.png"
            }

            document.querySelector(".weather").style.display = "block"
            document.querySelector(".error").style.display = "none"
        }
    }


}

