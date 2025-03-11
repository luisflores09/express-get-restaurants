const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.use(express.json());
app.use(express.urlencoded());

app.get("/restaurants", async (req, res) => {
  let allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

app.post("/restaurants", async (req, res) => {
  try {
    console.log(req.body);
    await Restaurant.create(req.body);
    const allRestaurants = await Restaurant.findAll();
    res.status(201).json(allRestaurants); // Use 201 for created resources
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" }); // Log error in a real app
  }
});

app.get("/restaurants/:id", async (req, res) => {
  let restaurantId = req.params.id;
  let restaurant = await Restaurant.findByPk(restaurantId);
  res.json(restaurant);
});

app.put("/restaurants/:id", async (req, res) => {
  let restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.update(req.body);
  let allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

app.delete("/restaurants/:id", async (req, res) => {
  let restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.destroy();
  let allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

module.exports = app;
