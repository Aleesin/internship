const weatherServices = require('../services/weather.js')

module.exports = (app) => {
	app.use('/weather', weatherServices());
}