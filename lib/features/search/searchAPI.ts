const APIKey = '5d50cb77a4d850371ce5a430e31c9b24';

export const fetchSearch = async (value = "") => {
    let responseWeather: any = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${APIKey}`);
    responseWeather = await responseWeather.json();
    let responseForecast: any = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${responseWeather?.coord.lat}&lon=${responseWeather?.coord.lon}&cnt=${5}&appid=${APIKey}`);
    responseForecast = await responseForecast.json();

    return { responseWeather, responseForecast };
};
