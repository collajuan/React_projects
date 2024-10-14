import { useState, useEffect } from 'react'
import WeatherForm from './weatherForm'
import WeatherMainInfo from './weatherMainInfo'

import styles from './weatherApp.module.css'

function WeatherApp() {
	const [weather, setWeather] = useState(null)
	const url = 'http://api.weatherapi.com/v1/current.json?aqi=no'

	useEffect(()=>{
		loadInfo()
	}, [])

	useEffect(() => {
		document.title = `Weather | ${weather?.location.name ?? ''}`
	})

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
		<div className={styles.weatherContainer}>
			<WeatherForm onChangeCity={handleChangeCity}/>
			<WeatherMainInfo weather={weather} />
			</div>
  )
}

export default WeatherApp