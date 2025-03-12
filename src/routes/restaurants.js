const { Router } = require("express");
const router = Router();
const Restaurant = require('../../models/Restaurant')

router.get("/", async (req, res) => {
  let allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    await Restaurant.create(req.body);
    const allRestaurants = await Restaurant.findAll();
    res.status(201).json(allRestaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  let restaurantId = req.params.id;
  let restaurant = await Restaurant.findByPk(restaurantId);
  res.json(restaurant);
});

router.put("/:id", async (req, res) => {
  let restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.update(req.body);
  let allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

router.delete("/:id", async (req, res) => {
  let restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.destroy();
  let allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

module.exports = router;
