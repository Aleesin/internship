const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const viewsDir = __dirname + '/views';
const staticDir = path.join(__dirname, 'dist')

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(viewsDir));


routes(app);




app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json(err)
});
app.get('/dist/bundle.js', (req, res) => {
	res.sendFile(path.resolve('./dist/bundle.js'));
})

	
app.listen(8080, (req, res) => {
	console.log("listening ...");
})