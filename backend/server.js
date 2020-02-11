const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const userRouter = require('./route/user');
const restaurantRouter = require('./route/restaurant');
const deliveryRouter = require('./route/delivery');
const config = require('./config')[process.env.NODE_ENV];
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const jwt = expressJWT({secret: process.env.AXIOM_IV}).unless({path: ['/user/login', '/user/signup', '/restaurant/login', '/restaurant/signup']});

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
app.use('/restaurant', jwt, restaurantRouter);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/api/v1',router);


var server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = server;