const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (req, res) => {
  let allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  let restaurantId = req.params.id;
  let restaurant = await Restaurant.findByPk(restaurantId);
  res.json(restaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  let restaurantId = req.params.id;
  let restaurant = await Restaurant.findByPk(restaurantId);
  await restaurant.destroy();
  let allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

module.exports = app;
