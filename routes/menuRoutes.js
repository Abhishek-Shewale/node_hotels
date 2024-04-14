const express = require("express");
const router = express.Router(); // Use express.Router() instead of express()
const Menu = require("../models/Menu");

// Post method for
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the menu data

    const newMenu = new Menu(data);

    const response = await newMenu.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get method to get the menu
router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "spicy" || taste == "sour" || taste == "sweet") {
      const data = await Menu.find({ taste: taste });
      console.log("Data fetched");
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuData = req.body;

    const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, // Return hte updated document
      runValidators: true, //Run Mongoose validation
    });
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("Menu updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuId);

    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("Menu Deleted");
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Comment added to testing purpose

module.exports = router;
