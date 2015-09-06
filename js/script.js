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
      var end=0;

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
                moment(localTime).format('ll'),	// Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.temp.day)
            );
        });
        $('#location').html('<b>'+city + '</b>');
         // Додаємо локацію на сторінку
    }

    
     function addWeather(icon, day, condition, temp){
         var markup =
         '<td>' + '<img src="img/icons/'+icon+'.png" />' + '</td>'+
         '<td class="td">' + '<span class="day after"></span><br>'+
            '<span class="temp after"> </span>&#176C;<br>' +
            '<span class="condition after"></span>'+'</td>'
             

         weather.innerHTML = markup;
         animatedText('.day', 'Сьогодні:  ' + day);
         animatedText('.temp', 'Температура: ' + temp);
         animatedText('.condition', 'На вулиці:  ' + condition);
    }
    
    function animatedText(el, text) {
        if (!text) { // Recursion exit condition
            $(el).removeClass('after');
            $(el).append(text);
            return; 
        }
        $(el).append(text[0]);
        setTimeout(function () {
            animatedText(el, text.slice(1));
        }, 150);
    }


    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    } 

    
        
   

      
   
});
