const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const userRouter = require('./route/user');
const adminRouter = require('./route/admin');
const restaurantOwnerRouter = require('./route/restaurantowner');
const restaurantRouter = require('./route/restaurant');
const deliveryRouter = require('./route/delivery');
const menuItemRouter = require('./route/menuitem'); 
const orderRouter = require('./route/order');
const config = require('./config')[process.env.NODE_ENV];
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const dev = require('./route/dev_ops');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const jwt = expressJWT({secret: process.env.AXIOM_IV}).unless({path: [
    '/user/login', '/user/signup', '/owner/login', '/owner/signup', '/restaurant/login', '/restaurant/signup', '/admin/signup', '/admin/login',
    '/restaurant/all', '/restaurant/menu', '/order/update', '/order/all', '/user/', '/order/create', '/restaurant/getByCategory'
]});

app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
    res.send("Hello World");
});

const uri = config['dburi'];
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use('/delivery', jwt, deliveryRouter);
app.use('/user', jwt, userRouter);
app.use('/owner', jwt, restaurantOwnerRouter);
app.use('/admin', jwt, adminRouter);
app.use('/restaurant', jwt, restaurantRouter);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/menu/item', jwt, menuItemRouter);
app.use('/order', jwt, orderRouter);
app.use('/api/v1',router);
if(process.env.NODE_ENV === 'development'){
    app.use('/dev', dev);
}

var server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = server;