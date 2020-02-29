const request = require('supertest');
const server = require('../server');

const owner = {
  owner:{
      "name": "Dashen Xia",
      "email": "dashen.xia@mail.mcgill.ca",
      "password": "123xwz",
      "address" : {
          "street": "2100 Boul de Masionneuve",
          "city": "montreal",
          "zip": "H3H1K6",
      }
  },
  restaurant:{
      name: 'shitang',
      address: {
          "street": "2200 Boul de Masionneuve",
          "city": "montreal",
          "zip": "H3H1M6"
      },
      category: 'Chinese'
  }
}

module.exports = () => {
  describe('Get /restaurant/getByCategory', () => {
      it('should return restaurants matching the specified category', async () => {
        await request(server)
          .post('/owner/signup')
          .type("json")
          .send(owner);
        const res = await request(server)
            .get('/restaurant/getByCategory')
            .set('category', owner.restaurant.category)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].address.street).toBe(owner.restaurant.address.street.toLowerCase());
        expect(res.body[0].address.city).toBe(owner.restaurant.address.city.toLowerCase());
        expect(res.body[0].address.zip).toBe(owner.restaurant.address.zip.toLowerCase());
        expect(res.body[0].name).toBe(owner.restaurant.name);
        expect(res.body[0].category).toBe(owner.restaurant.category);
      })
  });
}