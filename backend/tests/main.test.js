const request = require('supertest');
const server = require('../server');
const mongoose = require('mongoose');

// imports tests for each feature here
const admin_test = require('./admin_test');
const owner_test = require('./owner_test');
const user_test = require('./user_test');
const menu_item_test = require('./menu_item_test');
const rest_category_test = require('./rest_category_test');

beforeAll(clearDatabase);

function clearDatabase(done){
    mongoose.connection.dropDatabase((error ,result) => {
        if (error) {
          console.log('Reset database failed');
        } else {
          console.log('cleared');
        }
        done();
    });
};

// main test entry
admin_test();
owner_test();
user_test();
menu_item_test();
rest_category_test();
afterAll(clearDatabase);