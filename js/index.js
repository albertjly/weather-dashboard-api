$(function () {
    // make a JSON for weather icon
    var weatherIcons = [{
            name: 'Clouds',
            icon: 'bi-clouds'
        },
        {
            name: 'Rain',
            icon: 'bi-cloud-rain'
        },
        {
            name: 'Clear',
            icon: 'bi-cloud-slash'
        },
        {
            name: 'Snow',
            icon: 'bi-cloud-snow'
        },
        {
            name: 'Fog',
            icon: 'bi-cloud-fog2'
        }
    ];

    function weatherIcon(condition) {
        for (var i = 0; i < weatherIcons.length; i++) {
            if (weatherIcons[i].name === condition) {
                return weatherIcons[i].icon;
            }
        }
    }

    // click on searchBtn
    var $btn = $('#searchBtn');
    $btn.on('click', function () {
        // get input value and change into lowercase
        var $cityInput = $('#cityInput').val();

        if ($cityInput === '') {
            alert('Please type a city name!');
        } else {
            fetchWeatherData($cityInput);
        }


    });


    function fetchWeatherData(cityName) {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=ebeb83ac281ae433806cf721fae06c95';

        fetch(apiUrl).then(function (response) {
            console.log(response);
            if (response.status === 404) {
                alert("It's not a city!");
                // break;
            } else {
                return response.json();
            }

        }).then(function (weatherData) {

            if (weatherData) {
                var $cityInput = $('#cityInput').val();
                $('.city-details').css('display', 'block');
                // insert <li> in ul
                var cityLi = $('<li>').addClass('cities col-12 bg-white');
                var cityName = $('<p>').addClass('pl-3').text($cityInput);

                $('#citySearchList').append(cityLi.append(cityName));
            }

            /*
            // using Bootstrap Icon
            var wCondition = weatherData.weather[0].main;
            $('#city-title').text(weatherData.name + ' ' + moment().format('L') + ' ').append($('<i>').addClass(
                weatherIcon(wCondition)
            ));
            */

            // using Weather API weather icon url
            var weatherIconUrl = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '.png';
            $('#city-title').text(weatherData.name + ' ' + moment().format('L') + ' ').append($('<img>').attr('src', weatherIconUrl));


            $('#city-temp').text('Temperature: ' + weatherData.main.temp + ' F');
            $('#city-humid').text('Humidity: ' + weatherData.main.humidity + ' %');
            $('#city-wind').text('Wind Speed: ' + weatherData.wind.speed + ' MPH');

            console.log(weatherData.weather[0].main);
            console.log(weatherData.weather[0].icon);

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
            var avgUvi = sum / uviData.daily.length;
            avgUvi = avgUvi.toFixed(2);

            var cityUvi = $('<span>').text(avgUvi);
            uviBg(avgUvi, cityUvi);
            var cityUviNow = $('<span>').text(uviData.current.uvi);
            uviBg(uviData.current.uvi, cityUviNow);

            $('#city-uvi').text('UV Index (Avg): ').append(cityUvi);
            $('#city-uvi-now').text('UV Index (Now): ').append(cityUviNow);


            // console.log('UV Index: ' + avgUvi);

            function uviBg(uviData, uviSpan) {
                if (uviData < 3) {
                    uviSpan.addClass('favorable');
                } else if (uviData >= 3 && uviData < 5) {
                    uviSpan.addClass('moderate');
                } else {
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