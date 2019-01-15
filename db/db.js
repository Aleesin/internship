const { Pool, Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'alessingera',
  port: 5432,
})
client.connect().then(() => {
	client.query("CREATE TABLE tasks (id serial primary key, name text unique not null)", (err, done) => {
		console.log("done", done)
	});
}).catch(err => console.log("err", err));


exports.client = client;

