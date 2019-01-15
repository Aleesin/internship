import React, { Component } from 'react';

const Weather = (props) => {
	return  (
		<div className = "weather__info">
  		{

  			props.city && <p className="weather__key">
			      			location: <span className="weather__value"> {props.city}, {props.country}</span>
			      		  </p>
  		}	
  		{
	      	props.main && <p className="weather__key">temperature: <span className="weather__value"> {props.main.temp}</span></p>
      	}
      	{
      		props.main && <p className="weather__key">
				      		pressure: <span className="weather__value"> {props.main.pressure}</span>
				      	</p>
      	}
      	{
      		props.main && <p className="weather__key">
				      		humidity: <span className="weather__value"> {props.main.humidity}</span>
				      	</p>
      	}
      	{
      		props.weather && <p className="weather__key">
					      		condition : <span className="weather__value"> {props.weather[0].description}</span>
					      	</p>
      	}
      	{props.err && <p className="weather__key">message: <span className="weather__value">{props.err.message}</span> <br />status: <span className="weather__value">{props.err.status}</span></p>}
     </div>)
}
Weather.defaultProps = {
	city: undefined,
	country: undefined,
	main: undefined,
	weather:undefined,
	err: undefined
}
export default Weather;