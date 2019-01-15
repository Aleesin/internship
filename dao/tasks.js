const { client } = require('../db/db.js');



let getAllTasks = () => 
	new Promise(async (resolve, reject) => {
		try {
			let result = await client.query('select * from tasks');
			resolve(result);	
		} catch (err) {
			reject(err)
		}
	})


let postTask = (opts) => {
	return new Promise(async (resolve, reject) => {
		try {
			let result = await client.query('insert into tasks (name) values ($1)', [opts]);
			resolve(result);	
		} catch (err) {
			reject(err);
		}
	})
}


module.exports = {
	getAllTasks: getAllTasks,
	postTask: postTask
}