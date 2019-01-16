let asyncMiddleware = fn => 
	async (req, res, next) => {
		try {
			await fn(req, res)
		} catch (err) {
			next({
				message: err.response.data.message,
				status: err.response.data.cod	
			})	
		}
	}
let inputHandler = () => (req, res, next) => {
	let city = req.query["city"];
	let country = req.query["country"];
	if (!city || !country) {
		next({
			message: "city or country is missing",
			status:502
		});
	} else {
		next();
	}
}


module.exports.asyncMiddleware = asyncMiddleware;
module.exports.inputHandler = inputHandler;