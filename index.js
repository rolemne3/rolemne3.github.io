let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  
function month(s){
    if(s < 10) return `0${s}`;
    else return s;
}

function day(s){
    if(s < 10) return `0${s}`;
    else return s;
}

function success(pos) {
    let d = new Date();
    let crd = pos.coords;
    let lat = crd.latitude;
    let long = crd.longitude;
    let forecastUrl = `https://api.weather.com/v2/turbo/vt1hourlyForecast?apiKey=d522aa97197fd864d36b418f39ebb323&format=json&geocode=${lat}%2C${long}&language=en-US&units=m`;
    let infoUrl = `https://api.weather.com/v3/location/point?apiKey=d522aa97197fd864d36b418f39ebb323&format=json&geocode=${lat}%2C${long}&language=en-US`;
    fetch(infoUrl, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            $("#city").text(`${data.location.city}, ${data.location.countryCode}`);
            $("#lat").text(`Latitude : ${data.location.latitude}`);
            $("#long").text(`Longitude : ${data.location.longitude}`);
            $("#country").text(data.location.country);
            $("#ianaTimeZone").text(data.location.ianaTimeZone);
            $("#date").text(`${day(d.getDate())}/${month(d.getMonth()+1)}/${d.getFullYear()}`);
        })
        .catch(err => {
            console.log(err);
        })
    fetch(forecastUrl, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .then(data =>{
            $('#deg').text(`Temperature(C) : ${data.vt1hourlyForecast.temperature[d.getHours()+1]}`);
            $('#feelslike').text(`Feels like : ${data.vt1hourlyForecast.feelsLike[d.getHours()+1]}`);
            $('#phase').text(data.vt1hourlyForecast.phrase[d.getHours()+1]);
            $('#index').text(`UV Index : ${data.vt1hourlyForecast.uvIndex[d.getHours()+1]}`);
            console.log(data);
        })
}   

  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

setInterval(function(){
    document.querySelector('img').src = 'weather3.png';
},4000);

setInterval(function(){
    document.querySelector('img').src = 'weather2.png';
},8000);
