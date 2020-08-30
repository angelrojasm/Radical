const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const sampleModel = require('./mongoose/sampleModel');

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'));
}
app.listen(process.env.PORT || port, () => {
	console.log('app is running on port ' + port);
});

app.get('/hello', function (req, res) {
	res.send('hello from Express!');
});

app.get('/get-all', async function (req, res) {
	res.send(await sampleModel.find());
});

module.exports = app;
