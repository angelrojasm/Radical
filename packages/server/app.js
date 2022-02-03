const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const userRouter = require('./routers/userRouter');
const itemRouter = require('./routers/itemRouter');
const cartRouter = require('./routers/cartRouter');
const likesRouter = require('./routers/likesRouter');
const orderRouter = require('./routers/orderRouter');
const fileUpload = require('express-fileupload');
const adminRouter = require('./routers/adminRouter');

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/cart', cartRouter);
app.use('/likes', likesRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT || port, () => {
	console.log('app is running on port ' + port);
});

module.exports = app;
