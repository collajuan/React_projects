import { useState, useEffect } from 'react'
import WeatherForm from './weatherForm'

function WeatherApp() {
	const [weather, setWeather] = useState(null)
	const url = 'http://api.weatherapi.com/v1/current.json?aqi=no'

	useEffect(()=>{
		loadInfo()
	}, [])

	async function loadInfo(city='london'){	
		try {
			const request = await fetch(`${url}&key=${process.env.REACT_APP_KEY}&q=${city}`)
			const data = await request.json()
			console.log(data);
			setWeather(data)
			
		} catch (error) {
			// console.log(error);			
		}
	}

	function handleChangeCity(city) {
		setWeather(null)
		loadInfo(city)
	}

  return (
		<div>
			<WeatherForm onChangeCity={handleChangeCity}/>
			<div>{weather?.current.temp_c}</div>
		</div>
  )
}

export default WeatherApp