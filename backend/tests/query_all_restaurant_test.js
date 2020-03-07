const request = require('supertest');
const server = require('../server');

const owner_normal = {
     owner:{
         "name": "Lebron James",
         "email": "lebron.james@mail.mcgill.ca",
        "password": "123lbj",
        "address" : {
            "street": "2102 Boul de Masionneuve",
            "city": "montreal",
            "zip": "H3H1K9",
        }
    },
    restaurant:{
        name: 'KFC',
        address: {
            "street": "222 Boul de Masionneuve",
            "city": "montreal",
            "zip": "H3H1M1"
        }
    }
}

const all_restaurants = ["shitang", "basha", "KFC"]

module.exports = () => {
    describe('Get /restaurant/all', () => {
        it('should return a list of registered restaurants', async () => {
          await request(server)
            .post('/owner/signup')
            .type("json")
            .send(owner_normal);
          const res = await request(server)
              .get('/restaurant/all')
              .send();
          expect(res.statusCode).toEqual(200);
          expect(res.body.length).toEqual(3);
          for(i=0; i<res.body.length; i++) {
            expect(res.body[i].name).toEqual(all_restaurants[i]);
          }
        })
    });
  }


