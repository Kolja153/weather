function getWeatherByCity(lang, fnOK, fnError, cityName) {
    $.getJSON(
        'http://api.openweathermap.org/data/2.5/forecast/daily?q=' 
        + cityName + '&cnt=7&units=metric' + '&lang=' + lang + '&callback=?',
        function (data) {
            fnOK.call(this, data);
        }
    );
}

