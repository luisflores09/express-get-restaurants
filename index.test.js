const request = require("supertest");
const app = require("./src/app");
const Restaurant = require("./models/Restaurant");

describe("Restaurant routes", () => {
  describe("GET /restaurants", () => {
    it("returns a status code of 200", async () => {
      const response = await request(app).get("/restaurants");
      expect(response.statusCode).toBe(200);
    });

    it("returns an array of restaurants", async () => {
      const response = await request(app).get("/restaurants");
      expect(response.body).toBeInstanceOf(Array);
    });

    it("returns the correct number of restaurants", async () => {
      const restaurants = await Restaurant.findAll();
      const response = await request(app).get("/restaurants");
      expect(response.body.length).toBe(restaurants.length);
    });

    it("returns the correct restaurant data", async () => {
      const restaurants = await Restaurant.findAll();
      const response = await request(app).get("/restaurants");
      expect(response.body).toEqual(restaurants);
    });

    it("returns the correct restaurant data", async () => {
      const restaurants = await Restaurant.findAll();
      const response = await request(app).get("/restaurants/1");
      expect(response.body).toEqual(restaurants[0]);
    });
  });

  describe("POST /restaurants", () => {
    it("returns the restaurants array with the new restaurant", async () => {
      const newRestaurant = {
        name: "Test Restaurant",
        location: "Test Location",
        cuisine: "Test Cuisine"
      };
      const response = await request(app).post("/restaurants").send(newRestaurant);
      const allRestaurants = await Restaurant.findAll();
      expect(response.body).toEqual(allRestaurants);
    });
  });

  describe("PUT /restaurants/:id", () => {
    it("updates the restaurants array with the provided values", async () => {
      const updatedRestaurant = {
        name: "Updated Restaurant",
        location: "Updated Location",
        cuisine: "Updated Cuisine"
      };
      const response = await request(app).put("/restaurants/1").send(updatedRestaurant);
      const allRestaurants = await Restaurant.findAll();
      expect(response.body).toEqual(allRestaurants);
    });
  });

  describe('DELETE /restaurants/:id', () => {
    //TODO: Test that DELETE /restaurants/:id deletes the restaurant with the provided id from the array
    it('deletes the restaurant with the provided id from the array', async () => {
      const response = await request(app).delete('/restaurants/1');
      const allRestaurants = await Restaurant.findAll();
      expect(response.body).toEqual(allRestaurants);
    });
  });
});
