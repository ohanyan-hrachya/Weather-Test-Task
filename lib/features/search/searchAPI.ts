const APIKey = "5d50cb77a4d850371ce5a430e31c9b24";

const buildUrl = (path: string, params: Record<string, string | number>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.set(key, String(value));
        }
    });
    return `https://api.openweathermap.org/data/2.5/${path}?${searchParams.toString()}`;
};

const fetchJson = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
};

export const fetchSearch = async (value = "") => {
    const sanitizedValue = value.trim();
    if (!sanitizedValue) {
        throw new Error("Please provide a city name.");
    }

    const responseWeather = await fetchJson(
        buildUrl("weather", { q: sanitizedValue, units: "metric", appid: APIKey }),
    );

    if (!responseWeather?.coord) {
        throw new Error("Unable to find weather for that location.");
    }

    const responseForecast = await fetchJson(
        buildUrl("forecast/daily", {
            lat: responseWeather.coord.lat,
            lon: responseWeather.coord.lon,
            cnt: 5,
            units: "metric",
            appid: APIKey,
        }),
    );

    return { responseWeather, responseForecast };
};
