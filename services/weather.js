const { Router } = require('express');
let router = Router();
const API =require('../sec/API.js')
const axios = require('axios');
//const { inputHandler, asyncMiddleware } = require('../middlewares/middlewares.js');



let getWeather = (opts) => axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${opts.city}	,${opts.country}&appid=${API}&units=metric`)

module.exports = () => {
	router.get('/', async (req, res) => {
		let city = req.query["city"];
		let country = req.query["country"];
		if (!city || !country) {
			res.status(502).json({
				message: "city or country is missing",
				status:502
			});
		} else {
			try {
				let result = await getWeather({
					city: city,
					country: country
				});
				let data = result.data;
				res.status(200).json(data);
			} catch (err) {
				res.status(500).json({
					message: err.response.data.message,
					status: err.response.data.cod	
				})
			}
		}
	});
	return router;
}