let asyncMiddleware = fn => 
	async (req, res, next) => {
		console.log('here');
		try {
			await fn(req, res)
		} catch (err) {
			console.log("BIGG ERRROR")
			next({
				message: err.response.data.message,
				status: err.response.data.cod	
			})	
		}
	}
let inputHandler = () => (req, res, next) => {
	let city = req.query["city"];
	let country = req.query["country"];
	console.log('im here')
	if (!city || !country) {
		next({
			message: "city or country is missing",
			status:502
		});
	} else {
		console.log("all good for inputs");
		next();
	}
}


module.exports.asyncMiddleware = asyncMiddleware;
module.exports.inputHandler = inputHandler;