const request = require("supertest");
const server = require("../server");

const customer = {
  name: "kobebryant",
  email: "kobe.bryant@mail.mcgill.ca",
  password: "123kobe",
  address: {
    street: "220 Boul de Masionneuve",
    city: "montreal",
    zip: "H3H1K6"
  }
};

async function createAndGetCustomerInfo() {
  let obj = {};
  const register = await request(server)
    .post("/user/signup")
    .type("json")
    .send(customer);
  expect(register.statusCode).toEqual(201);
  const res = await request(server)
    .get("/user/login")
    .set("email", consumer.email)
    .set("password", consumer.password)
    .send();
  expect(res.statusCode).toEqual(200);
  obj.customer_id = register.body._id;
  obj.token = res.body.token;
  obj.email = register.body.email;
  return obj;
}

module.exports = () => {
  describe("Delete /cart", () => {
    it("", async () => {});
  });
};
