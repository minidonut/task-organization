const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const db = require('./db-manager.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const $api_key = "a1af7808fae808d4715f6e6cd0fdc1bf317faa3b7f505c2bca792d04ffc5c700";


app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(cookieParser);


const ary = [
	'md',
	'text'
];


app.get('/', function(req, res) {

	if (Object.keys(req.cookies).includes('api-key') && req.cookies['api-key'] === $api_key) {
		fs.readFile('./index.html', function(err, html) {
			if (err) {
				throw err;
			}
			res.writeHeader(200, { "Content-Type": "text/html" });
			res.write(html);
			res.end();
		});
	}
	else {
		res.redirect('/login');
	}

});

app.get('/login', function(req, res) {
	if (Object.keys(req.cookies).includes('api-key') && req.cookies['api-key'] === $api_key) {
		res.redirect('/');
	}
	else {
		fs.readFile('./login/index.html', function(err, html) {
			if (err) {
				throw err;
			}
			res.writeHeader(200, { "Content-Type": "text/html" });
			res.write(html);
			res.end();
		})
	}
})

app.post('/cert', function(req, res) {
	if (req.body.token === $api_key) {
		res.json({ code: 200, key: $api_key });
	}
	else {
		res.json({ code: 406 })
	}
})


app.get('/data', function(req, res) {

	if (Object.keys(req.cookies).includes('api-key') && req.cookies['api-key'] === $api_key) {
		console.log("send data");
		res.json(db.getData());
	}
	else {
		res.redirect('/login');
	}



});

app.post('/update', function(req, res) {

	if (Object.keys(req.cookies).includes('api-key') && req.cookies['api-key'] === $api_key) {
		db.update(req.body);
		res.json(db.getData());
	}
	else {
		res.redirect('/login');
	}

})



app.use(express.static(__dirname));


app.listen(3000, function() {
	console.log('test app is listening on port 3000');
});
