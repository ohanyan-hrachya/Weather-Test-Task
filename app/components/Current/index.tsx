"use client";

const Current = ({ current, weather }: { current: any, weather: any }) => {
    return <div>
        <div>
            <strong>{weather.name}</strong>
        </div>
        <h1>{Math.round(current.temp.day)}&deg;</h1>
        <div >
            <img src={`https://openweathermap.org/img/w/${current.weather[0].icon}.png`} />
        </div>
        <div>
            <strong>{current.weather[0].main}</strong> <br />{" "}
        </div>
    </div>;
}

export default Current;