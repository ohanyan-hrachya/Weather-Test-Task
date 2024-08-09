"use client";

import { useEffect, useState } from "react";

const APIKey = '5d50cb77a4d850371ce5a430e31c9b24';

const Hourly = ({ weather, slug }: any) => {
    const [list, setList] = useState();

    // useEffect(() => {
    //     (async () => {
    //         const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${weather.coord.lat}&lon=${weather.coord.lon}&cnt=${5}&appid=${APIKey}`);
    //         const responce = await res.json()
    //         setList(responce)
    //     })()
    // }, [])

    return <>{JSON.stringify(list)}</>
};

export default Hourly;