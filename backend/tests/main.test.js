const request = require('supertest');
const server = require('../server');
const mongoose = require('mongoose');

// imports tests for each feature here
const admin_test = require('./admin_test');
const owner_test = require('./owner_test');
const user_test = require('./user_test');
const menu_item_test = require('./menu_item_test');
const resturant_query_test = require('./restaurant_query_test');
const rest_category_test = require('./rest_category_test');
const order_test = require('./order_test');


function clearDatabase(done){
    mongoose.connection.dropDatabase((error ,result) => {
        if (error) {
          console.log('Reset database failed');
        } else {
          console.log('databse cleared');
        }
        done();
    });
};

// main test entry
beforeAll(clearDatabase);
admin_test();
owner_test();
user_test();
menu_item_test();
resturant_query_test();
rest_category_test();
order_test();
afterAll(clearDatabase);