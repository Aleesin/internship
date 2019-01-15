const { Router } = require('express');
let router = Router();
const tasks = require('../dao/tasks.js');
const API =require('../sec/API.js')
const axios = require('axios');
const { inputHandler, asyncMiddleware } = require('../middlewares/middlewares.js');



let getWeather = async (opts) => await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${opts.city}	,${opts.country}&appid=${API}&units=metric`)

let getPromises = async (first, second) => await Promise.all([getWeather(first), getWeather(second)])
module.exports = () => {
	router.get('/', inputHandler(), asyncMiddleware(async (req, res) => { 
		let city = req.query["city"];
		let country = req.query["country"];
		if (city.indexOf(',') !== -1) {
			let [firstCity, secondCity] = city.split(',');
			let [firstCountry, secondCountry] = country.split(',');
			let promises = await getPromises({city: firstCity, country:firstCountry},{city: secondCity, country:secondCountry} )
			res.status(200).json({
				data: {
					firstData: promises[0].data,
					secondData: promises[1].data,
					multiple: true
				}
			})
		} else {
			let result = await getWeather({
				city: city,
				country: country
			});
			let data = result.data;
			console.log(data)
			res.status(200).json(data);
		}
		
	}));
	return router;
}