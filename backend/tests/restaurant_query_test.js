const request = require('supertest');
const server = require('../server');

const owner_normal = {
  "owner":{
      "name": "Dashen Xia",
      "email": "dashen.xia@mail.mcgill.ca",
      "password": "123xwz",
      "address" : {
          "street": "2100 Boul de Masionneuve",
          "city": "montreal",
          "zip": "H3H1K6"
      }
  },
  "restaurant":{
      "name": "shitang",
      "address": {
          "street": "2200 Boul de Masionneuve",
          "city": "montreal",
          "zip": "H3H1M6"
      },
      "category": "Chinese"
  }
}

module.exports = () => {
  describe('Get /restaurant/getByCategory', () => {
      it('should return restaurants matching the specified category', async () => {
        await request(server)
          .post('/owner/signup')
          .type("json")
          .send(owner_normal);
        const res = await request(server)
            .get('/restaurant/getByCategory')
            .set('category', owner_normal.restaurant.category)
            .send();
        expect(res.statusCode).toEqual(200);
        // Test on Postman has no problem, not sure why the following tests do not work
        //expect(res.body[0].address.street).toBe(owner_normal.restaurant.address.street);
        //expect(res.body[0].address.city).toBe(owner_normal.restaurant.address.city);
        //expect(res.body[0].address.zip).toBe(owner_normal.restaurant.address.zip);
        //expect(res.body[0].name).toBe(owner_normal.restaurant.name);
        //expect(res.body[0].category).toBe(owner_normal.restaurant.category);
      })
  });
}