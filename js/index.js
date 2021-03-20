$(function () {

    $('.city-details').css('display', 'none');

    var $btn = $('#searchBtn');
    $btn.on('click', function () {
        // get input value and change into lowercase
        var $cityInput = $('#cityInput').val().toLowerCase();

        if ($cityInput === ''){
            alert('Please type a city name!');
        }else {
            fetchWeatherData($cityInput);
        }
        $('.city-details').css('display', 'block');
    });


    function fetchWeatherData(cityName) {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=ebeb83ac281ae433806cf721fae06c95';
        // console.log(apiUrl);

        fetch(apiUrl).then(function (response) {
            return response.json();
            // console.log(response);
        }).then(function (weatherData) {
            
            $('#city-title').text(weatherData.name);
            $('#city-temp').text('Temperature: ' + weatherData.main.temp + ' F');
            $('#city-humid').text('Humidity: ' + weatherData.main.humidity + ' %');
            $('#city-wind').text('Wind Speed: ' + weatherData.wind.speed + ' MPH');

            var currentLat = weatherData.coord.lat;
            var currentLon = weatherData.coord.lon;

            return fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' + currentLat + '&lon=' + currentLon + '&appid=ebeb83ac281ae433806cf721fae06c95'
            )
        }).then(function (response) {
            return response.json();
        }).then(function (uviData) {
            // console.log(uviData.current.uvi);
            var sum = 0;
            for (var i = 0; i < uviData.daily.length; i++) {
                sum += parseFloat(uviData.daily[i].uvi);
            }
            var avgUvi = sum/uviData.daily.length;
            avgUvi = avgUvi.toFixed(2);

            var cityUvi = $('<span>').text(avgUvi);
            uviBg(avgUvi, cityUvi);
            var cityUviNow = $('<span>').text(uviData.current.uvi);
            uviBg(uviData.current.uvi, cityUviNow);

            $('#city-uvi').text('UV Index (Avg): ').append(cityUvi);
            $('#city-uvi-now').text('UV Index (Now): ').append(cityUviNow);


            // console.log('UV Index: ' + avgUvi);

            function uviBg(uviData, uviSpan) {
                if (uviData < 3){
                    uviSpan.addClass('favorable');
                }else if (uviData >= 3 && uviData < 5){
                    uviSpan.addClass('moderate');
                }else {
                    uviSpan.addClass('severe');
                }
            }
        })
    }







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