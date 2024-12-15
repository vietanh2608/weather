let a = 1
let b = 2
let c = 3
 if(a+b == c){
     console.log(c);
 }
    
    // Prevent the default action
document.getElementById('btn').addEventListener('click', async (e) => { 
    e.preventDefault();

    // Get city input and trim any leading/trailing spaces
    const city = document.getElementById('Cityinput').value.trim();
        console.log(city);

 
    // If no city is entered, show an error message
    const weatherinfo = document.getElementById('weatherinfo');
    if (!city) {
        weatherinfo.innerHTML = '<p class="error">Please enter city name.</p>';
        return; // Exit early if no city
    }


    // Show a loading message
    weatherinfo.innerHTML = '<p>Loading...</p>';

    const API_KEY = '3970f20d573dcbcf95bbfe9f97963883';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

    try {
        // Fetch weather data from the API
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);

        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        // Parse the JSON response
        const data = await response.json();

        // If the data is valid, display the weather info
        if (data.cod === 200) {
            const { name, main, weather } = data;
            weatherinfo.innerHTML = `
                <h3 style="color: white">Weather in ${name}</h3>
                <p style="color: white">Temperature: ${main.temp}°C</p>
                <p style="color: white">Weather: ${weather[0].description}</p>
                <p style="color: white">Humidity: ${main.humidity}%</p>
            `;
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        // Handle any errors (e.g., failed fetch or invalid city)
        weatherinfo.innerHTML = `<p class="error">${error.message}</p>`;
    }
});




