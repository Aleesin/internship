const { Router } = require('express');
let router = Router();
const tasks = require('../dao/tasks.js');
const API =require('../sec/API.js')
const axios = require('axios');
//const { inputHandler, asyncMiddleware } = require('../middlewares/middlewares.js');



let getWeather = (opts) => {
	return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${opts.city}	,${opts.country}&appid=${API}&units=metric`);
}

module.exports = () => {
	router.get('/', async (req, res) => {
		let city = req.query["city"];
		let country = req.query["country"];
		console.log("route get weather")
		if (!city || !country) {
			res.status(502).json({
				message: "city or country is missing",
				status:502
			});
		} else {
			if (city.indexOf(',') !== -1) {
				try {
					let [firstCity, secondCity] = req.query["city"].split(',');
					let [firstCountry, seconCountry] = req.query["country"].split(',');
					let firstResult = await getWeather({
						city: firstCity,
						country: firstCountry
					});
					let secondResult = await getWeather({
						city: secondCity,
						country: seconCountry
					});
					let firstData = firstResult.data;
					let secondData = secondResult.data;
					res.status(200).json({
						data: {
							firstData: firstData,
							secondData: secondData,
							multiple: true
						}
					})
				} catch (err) {
					console.log(err.response.data)
					res.status(500).json({
						message: err.response.data.message,
						status: err.response.data.cod	
					})
				}
			} else {
				try {
					let result = await getWeather({
						city: city,
						country: country
					});
					let data = result.data;
					console.log(data)
					res.status(200).json(data);
				} catch (err) {
					console.log(res.response.data)
					res.status(500).json({
						message: err.response.data.message,
						status: err.response.data.cod	
					})
				}
			}
		}
	});
	return router;
}