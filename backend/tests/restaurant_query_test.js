const request = require('supertest');
const server = require('../server');

const owner_normal = {
  "owner":{
      "name": "Dashen Xia1",
      "email": "dashen.xia1@mail.mcgill.ca",
      "password": "123xwz",
      "address" : {
          "street": "2100 Boul de Masionneuve",
          "city": "montreal",
          "zip": "H3H1K6"
      }
  },
  "restaurant":{
      "name": "shitang1",
      "address": {
          "street": "2200 Boul de Masionneuve",
          "city": "montreal",
          "zip": "H3H1M6"
      },
      "category": ['Chinese']
  }
}

async function createAndGetRestaurantIdPlusToken () {
  let obj = {};
  const register = await request(server)
      .post('/owner/signup')
      .type("json")
      .send(owner_normal);
  expect(register.statusCode).toEqual(201);
  const res = await request(server)
      .get('/owner/login')
      .set('email', owner_normal.owner.email).
      set('password', owner_normal.owner.password).
      send();
  expect(res.statusCode).toEqual(200);
  obj.restaurant_id = register.body.restaurants[0];
  obj.user_id = res.body._id;
  obj.token = res.body.token;
  obj.email = owner_normal.owner.email;
  token = res.body.token;
  return obj;
};

module.exports = () => {
  describe('Get /restaurant/getByCategory', () => {
      it('should return restaurants matching the specified category', async () => {
        let obj = await createAndGetRestaurantIdPlusToken();
        let token = obj.token;
        const res = await request(server)
            .get('/restaurant/getByCategory')
            .set('Authorization',`Bearer ${token}`)
            .query({'category': owner_normal.restaurant.category});
        expect(res.statusCode).toEqual(200);
        // Test on Postman has no problem, not sure why the following tests do not work
        expect(res.body[0].address.street).toBe(owner_normal.restaurant.address.street);
        expect(res.body[0].address.city).toBe(owner_normal.restaurant.address.city);
        expect(res.body[0].address.zip).toBe(owner_normal.restaurant.address.zip);
        expect(res.body[0].name).toBe(owner_normal.restaurant.name);
        expect(res.body[0].category[0]).toBe(owner_normal.restaurant.category);
      })
  });
}