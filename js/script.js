$(function(){
    $('#btnGetWeather').click(function () {
        getWeatherByCity('ua', dataReceived, showError, $('#inputCityName').val());
    });
    $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }
    });    
    
    getWeatherData('ua', dataReceived, showError);
    

    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC в секундах
        var city = data.city.name;
        var country = data.city.country;
        $("#weatherTable tr:not(:first)").remove();

        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // конвертуємо час з UTC у локальний
            addWeather(
                this.weather[0].icon,
                moment(localTime).format('l'),	// Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C'
            );
        });
        $('#location').html('<b>'+city + '</b>'); // Додаємо локацію на сторінку
    }

    function addWeather(icon, day, condition, temp){
        var markup = 
             '<td>' + '<img src="img/icons/'+icon+'.png" />' + '</td>'+
             '<td>' +  '<span class="day"> Сьогодні &nbsp' + day + '</span><br>'+ 
                '<span class="temp"> Температура &nbsp' + temp + '</span><br>' +
                '<span class="condition"> На небі &nbsp' + condition + '</span>' + '</td>';
                ;
        weather.innerHTML = markup; 
    }

    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }
});
