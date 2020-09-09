
today = moment().format('YYYY-MM-DD')
console.log(today)

$('#add-city').on('click', function() {
    
    event.preventDefault()
    
    var citySearch = $('#city-search').val().trim()

    var city = citySearch.charAt(0).toUpperCase() + citySearch.slice(1)

    getWeather(city)

    $('#city-search').val('')
})


var getWeather = function(city) {
    //makes fetch to server requesting latitude and longitude on the searched city. reasoning for this is that the one call api needs cords and not city name
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    `&appid=570d8de33c9f13f6bcd17075f75bc5f7`)
    .then(function(response) {
    
        if (response.ok) {
            response.json().then(function (data) {

                

                var lat =  data.coord.lat
                var lon =  data.coord.lon
                console.log(lat,lon)

                
                //fetch sat image here
                fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${today}&&dim=0.10&api_key=75EDpZRJF8eZ9HcAZZHk5u2nQA0rHgFV3m2yPTpr`)
                .then(function(response) {

                    if (response.ok){
                        response.json().then(function(data1){
                            
                            var url = data1.url
                            
                            setBg(url)

                            

                        })
                    } else {
                        console.log('image not found')
                    }
                })
                 
                
            });
            
        } else {
            window.alert("Sorry! We couldn't find your city")
            location.reload();
        }
    })
}            


var setBg = function(url) {
    $('#sat').css("background-image", `url(${url})`);
}