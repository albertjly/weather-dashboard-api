$(function () {


    function fetchWeatherData(cityName) {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=los angeles&units=imperial&appid=ebeb83ac281ae433806cf721fae06c95';

        fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (weatherData) {
            console.log('Name: ' + weatherData.name);
            console.log('Temperature: ' + weatherData.main.temp + ' F');
            console.log('Humidity: ' + weatherData.main.humidity + ' %');
            console.log('Wind Speed: ' + weatherData.wind.speed + ' MPH');
            // console.log(response.current.visibility);

            var currentLat = weatherData.coord.lat;
            var currentLon = weatherData.coord.lon;

            return fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' + currentLat + '&lon=' + currentLon + '&appid=ebeb83ac281ae433806cf721fae06c95'
            )
        }).then(function (response) {
            return response.json();
        }).then(function (uviData) {
            // console.log('UV Index: ' + uviData.current.uvi);
            var sum = 0;
            for (var i = 0; i < uviData.daily.length; i++) {
                sum += parseFloat(uviData.daily[i].uvi);
            }
            var avgUvi = sum/uviData.daily.length;
            console.log('UV Index: ' + avgUvi);
        })
    }

    fetchWeatherData();





    function fetchUviData() {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=ebeb83ac281ae433806cf721fae06c95';

        fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log('UV Index: ' + response.current.uvi);
            // console.log(response.current.visibility);
        })
    }

    // fetchUviData();
});