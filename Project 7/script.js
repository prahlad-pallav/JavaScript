let userTab = document.querySelector('[data-userWeather]');
let searchTab = document.querySelector('[data-searchWeather]');
let userContainer = document.querySelector(".weather-container");

let grantAccessContainer = document.querySelector(".grant-location-container");
let searchForm = document.querySelector("[data-searchForm]");
let loadingScreen = document.querySelector(".loading-container");
let userInfoContainer = document.querySelector('.user-info-container');
let grantAccessButton = document.querySelector('[data-grantAccess]');
let searchInput = document.querySelector('[data-searchInput]');
let errorContainer = document.querySelector('.error-container');


let currentTab = userTab;
const Api_key = 'd89edec2d5e2ba7f118f2b2ab5822b9d';
currentTab.classList.add("current-Tab");
getfromSessionStorage();

function swtichTab(clickedTab) {
    if(clickedTab != currentTab){
        currentTab.classList.remove('current-Tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-Tab');
        errorContainer.classList.remove('active');

        if(!searchForm.classList.contains('active')){
            userInfoContainer.classList.remove('active');
            grantAccessContainer.classList.remove('active');
            searchForm.classList.add('active');
        }else{
            searchForm.classList.remove('active');
            userInfoContainer.classList.remove('active');
            errorContainer.classList.remove('active');
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener('click',() => {
    swtichTab(userTab);
})

searchTab.addEventListener('click',() => {
    swtichTab(searchTab);
})

function getfromSessionStorage(){
    let localCoordinates = sessionStorage.getItem('user-coordinates');
    if(!localCoordinates){
        grantAccessContainer.classList.add('active');
    }
    else{let coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
}
}

async function fetchUserWeatherInfo(coordinates){
    let {lat, lon} = coordinates;
    
    grantAccessContainer.classList.remove('active');
    loadingScreen.classList.add('active');

    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Api_key}`);
        let data = await response.json();
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);
    }
    catch(e){
        loadingScreen.classList.remove('active');
        console.log('Error Found', e);
    }
    
}


function renderWeatherInfo(data){

    let cityName = document.querySelector("[data-cityName]");
    let countryIcon = document.querySelector("[data-countryIcon]");
    let desc = document.querySelector("[data-weatherDesc]");
    let weatherIcon = document.querySelector("[data-weatherIcon]");
    let temp = document.querySelector("[data-temp]");
    let windspeed = document.querySelector("[data-windspeed]");
    let humidity = document.querySelector("[data-humidity]");
    let cloudiness = document.querySelector("[data-cloudiness]");


    cityName.innerText = data?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = `${data?.weather?.[0]?.description}`;
    weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText = `${((data?.main?.temp)-273.15).toFixed(2)} °C`;
    windspeed.innerText = `${data?.wind?.speed} m/s`;
    humidity.innerText = `${data?.main?.humidity} %`;
    cloudiness.innerText = `${data?.clouds?.all} %`;
}

grantAccessButton.addEventListener('click', getLocation);

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        alert("GeoLocation Feature isn't Available");
    }
}

function showPosition(position){

    let userCoordinates = {
        lat : position.coords.latitude,
        lon : position.coords.longitude,
    }

    sessionStorage.setItem('user-coordinates',JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName === "") return;
    else{
        fetchSearchWeatherInfo(cityName);
    }
});

async function fetchSearchWeatherInfo(cityName){
    loadingScreen.classList.add('active');
    userInfoContainer.classList.remove('active');
    grantAccessContainer.classList.remove('active');
    errorContainer.classList.remove('active');

    try{
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Api_key }`);
    let data = await response.json();
    if(data?.cod == 200){
    loadingScreen.classList.remove('active');
    userInfoContainer.classList.add('active');
    errorContainer.classList.remove('active');
    renderWeatherInfo(data);
    }
    else{
        loadingScreen.classList.remove('active');
        errorContainer.classList.add('active');
    }
    }
    catch(e){
    console.log('error');

    }
}


console.log("good");