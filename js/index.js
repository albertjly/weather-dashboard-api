$(function () {
    function fetchData() {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=ebeb83ac281ae433806cf721fae06c95';

        fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response.timezone);
        });
    }

    fetchData();
});