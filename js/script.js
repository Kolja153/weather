$(function(){
    getWeatherData('ua', dataReceived, showError);

    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC  в мілісекундах
        var city = data.city.name;
        var country = data.city.country;

        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // конвертуємо час з UTC у локальний
            addWeather(
                this.weather[0].icon,
                moment(localTime).calendar(),	// Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C'
            );
        });
        $('#citi').html('<b>'+city + '</b>'); // Додаємо локацію на сторінку
    }

    function addWeather(icon, day, condition, temp){
        var markup = '<tr>'+
                '<td>' + day + '</td>' +
                '<td>' + '<img src="img/icons/'+ icon +'.png" />' + '</td>' +
                '<td>' + temp + '</td>' +
                '<td>' + condition + '</td>'
            + '</tr>';
        weatherTable.insertRow(-1).innerHTML = markup; // Додаємо рядок до таблиці
    }

    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }
});
