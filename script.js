
const wrapper = document.querySelector('.weather-icon');
const weatherResult = document.querySelector('#weatherResuult');

async function getWeather() {
    const apiKey = '905ab7068aa7414c800112023251402';
    const city = document.getElementById('city').value.trim();

    const weatherInfo = document.getElementById('weatherInfo');
    const message = document.getElementById('message');

    if (!city) {
        alert('Shahar nomini kiriting!');
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        message.textContent = 'Yuklanmoqda...';

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.error) {
            message.textContent = data.error
                ? data.error.message
                : 'Ma’lumot olishda xatolik!';
            weatherInfo.hidden = true;
            return;
        }

        // API objectidan ma'lumotlarni olamiz
        const weather = {
            city: data.location.name,
            country: data.location.country,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            humidity: data.current.humidity,
            wind: data.current.wind_kph,
            feelsLike: data.current.feelslike_c
        };

        // Object ichidagi ma'lumotlarni HTML'ga chiqaramiz
        document.getElementById('cityName').textContent =
            `${weather.city}, ${weather.country}`;

        document.getElementById('temperature').textContent =
            `${Math.round(weather.temperature)}°C`;

        weatherResult.textContent = weather.condition;

        document.getElementById('humidity').textContent =
            `${weather.humidity}%`;

        document.getElementById('wind').textContent =
            `${weather.wind} km/h`;

        document.getElementById('feelsLike').textContent =
            `${Math.round(weather.feelsLike)}°C`;

        // Ob-havo rasmi
        const iconUrl = weather.icon.startsWith('//')
            ? `https:${weather.icon}`
            : weather.icon;

        wrapper.innerHTML =
            `<img src="${iconUrl}" alt="${weather.condition}">`;

        weatherInfo.hidden = false;
        message.textContent = '';

        console.log(weather);

    } catch (error) {
        console.log(error);
        message.textContent =
            'Xatolik! Internet aloqasini tekshiring.';
    }
}

