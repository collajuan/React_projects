import { useState, useEffect } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo"


export default function WeatherApp(){
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        loadInfo()
    }, [])
    //!! useEffect
    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ""}`
    }, [weather])

    async function loadInfo(city = 'london') {
        console.log('Entra en loadInfo', city);
        
       try {
        //!! ver el tema de proces
        const request = await fetch("http://api.weatherapi.com/v1/current.json?aqi=no&q="+city+"&key=bb7a87128a8c4fadb69150343243008")
        // const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);

        const json = await request.json();

        console.log(json);
        setWeather(json)
        
       } catch (error){
        error.message()}
    }

    function handleChangeCity(city){
        setWeather(null)
        loadInfo(city)
    }

    return <div>
        <WeatherForm onChangeCity={handleChangeCity} />
        <WeatherMainInfo weather={weather}/>
    </div>;
}