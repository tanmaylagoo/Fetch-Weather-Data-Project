document.addEventListener("DOMContentLoaded",()=>{
    const cityinput=document.getElementById("city-input");
    const getweatherbtn=document.getElementById("getweather");
    const weatherinfo=document.getElementById("weather-info");
    const cityname=document.getElementById("cityname");
    const temperature=document.getElementById("temperature");
    const humidity=document.getElementById("humidity");
    const wind=document.getElementById("wind");
    const error_message=document.getElementById("error-message");
    const apikey="" //api key hidden on purpose still learning how to use an environment to hide API key

    getweatherbtn.addEventListener('click', async()=>{
        const city=cityinput.value.trim()
        if(!city) return
        //it may throw an error i.e server may throw an error therefore it is indispensable to use try and catch methods in these scenarios
        //server/database is usually always located in a different continent so it will take time to implement the function therefore, it is vital to use async await

        try {
            const weatherdata= await fetchWeatherData(city) 
            displayWeatherData(weatherdata);
        } catch (error) {
            show_error();
            
        }
    })
    async function fetchWeatherData(city) {
        //gets weather data from the API 
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        const response= await fetch(url);
        console.log(typeof response);
        console.log(response);
        if(!response.ok){
            throw new Error("City not found!");
        }
        const data=await response.json();
        return data;
        
          
    }       
    function displayWeatherData(data){
        console.log(data);
        const{name, main, weather, wind:winddata}=data;
            cityname.textContent=name;

            temperature.textContent=`Temperature: ${main.temp}°C`;
            humidity.textContent=`Humidity: ${main.humidity}%`
            wind.textContent = `Wind speed:${winddata.speed}m/s`;



            weatherinfo.classList.remove("hidden");
            error_message.classList.add("hidden");
            

        }
         
     function show_error() {
        weatherinfo.classList.add("hidden");
        error_message.classList.remove("hidden");     
    }
    });
    



    

  
