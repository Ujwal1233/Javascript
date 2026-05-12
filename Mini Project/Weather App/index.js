const APIKEY = "92f6ab8a38b3246aa4ba5324d6813381";

const searchBox = document.getElementById("city");
const searchBtn = document.getElementById("btn");
const message = document.getElementById("message");

async function checkWeather(city = 'Bengaluru') {
    message.textContent = '';
    const query = city.trim() || 'Bengaluru';

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&units=metric&appid=${APIKEY}`);
        const data = await res.json();

        if (!res.ok) {
            message.textContent = data.message ? data.message : 'Unable to fetch weather. Please try again.';
            document.querySelector('.city').innerHTML = 'Unknown location';
            document.querySelector('.temp').innerHTML = '0°c';
            document.querySelector('.humidity').innerHTML = '0%';
            document.querySelector('.wind').innerHTML = '0 Km/h';
            return;
        }

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' Km/h';
    } catch (error) {
        message.textContent = 'Network error. Check your connection and try again.';
        console.error(error);
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value)
})
searchBox.addEventListener("keyup", (e)=>{
    if (e.key == "Enter") {
        checkWeather(searchBox.value)
    }
})

checkWeather()