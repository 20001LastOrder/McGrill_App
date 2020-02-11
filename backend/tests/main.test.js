// const request = require('supertest')
// const server = require('../server')
// const mongoose = require('mongoose');

// beforeAll(clearDatabase);

// function clearDatabase(done){
//     mongoose.connection.dropDatabase((error ,result) => {
//         if (error) {
//           console.log('Reset database failed');
//         } else {
//           console.log('cleared');
//         }
//         done();
//     });
// };

// var firstname = 'kobe'
// var lastname = 'bryant'
// var email = 'kobe.bryant@mail.mcgill.ca'
// var user_password = 'kobegoat'
// var street = '200 sherbrooke west'
// var city = 'montreal'
// var zip = 'h2h1m3'

// describe('Post /user/signup', () => {
//     it('should register a new user', async () => {
//     const res = await request(server)
//         .post('/user/signup')
//         .type("json")
//         .send({
//             'username.firstname': firstname,
//             'username.lastname': lastname,
//             'email': email,
//             'password': user_password,
//             'address.street': street,
//             'address.city': city,
//             'address.zip': zip,
//         });

//     // console.log(res.body)
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty('username.firstname');
//     expect(res.body).toHaveProperty('username.lastname');
//     expect(res.body).toHaveProperty('email');
//     expect(res.body).toHaveProperty('address.street');
//     expect(res.body).toHaveProperty('address.city');
//     expect(res.body).toHaveProperty('address.zip'); 
//     expect(res.body['username.firstname']).toBe(firstname);
//     expect(res.body['username.lastname']).toBe(lastname);
//     expect(res.body['email']).toBe(email);
//     expect(res.body['address.street']).toBe(street);
//     expect(res.body['address.city']).toBe(city);
//     expect(res.body['address.zip']).toBe(zip);
//     expect(res.body).toHaveProperty('password');
//     expect(res.body['password']).not.toBe(password);
//     })
// });

// // describe('Get /user/login', () => {
// //     it('should login the user and give back a token', async () => {
// //     const res = await request(server)
// //         .get('/user/login')
// //         .set('email', email).
// //         set('password', user_password).
// //         send();
// //     expect(res.statusCode).toEqual(200);
// //     expect(res.body).toHaveProperty('token');
// //     })
// // });


// // var restaurant_username = 'restaurant1';
// // var restaurant_password = '1234Restaurant1';

// // describe('Post /restaurant/signup', () => {
// //     it('should register a new restaurant', async () => {
// //     const res = await request(server)
// //         .post('/restaurant/signup')
// //         .send({
// //         'username': restaurant_username,
// //         'password': restaurant_password,
// //         });
// //     expect(res.statusCode).toEqual(201);
// //     expect(res.body).toHaveProperty('username');
// //     expect(res.body['username']).toBe(restaurant_username);
// //     expect(res.body).toHaveProperty('password');
// //     expect(res.body['password']).not.toBe(restaurant_password);
// //     })
// // });

// // describe('Get /restaurant/login', () => {
// //     it('should login the restaurant and give back a token', async () => {
// //     const res = await request(server)
// //         .get('/restaurant/login')
// //         .set('username', restaurant_username).
// //         set('password', restaurant_password).
// //         send();
// //     expect(res.statusCode).toEqual(200);
// //     expect(res.body).toHaveProperty('token');
// //     })
// // });