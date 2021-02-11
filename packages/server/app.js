const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const path = require('path');
const userRouter = require('./routers/userRouter')
const itemRouter = require('./routers/itemRouter')
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(cors());
app.use(fileUpload())
app.use('/user',userRouter);
app.use('/item',itemRouter)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'));
}

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});
app.listen(process.env.PORT || port, () => {
	console.log('app is running on port ' + port);
});



module.exports = app;
