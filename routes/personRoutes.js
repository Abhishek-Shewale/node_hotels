const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);

    res.status(201).json({ response: response, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile route
router.get("./profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all persons (protected route)
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get persons by work type
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (["chef", "manager", "waiter"].includes(workType)) {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update person by ID
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      { new: true, runValidators: true }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete person by ID
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json({ message: "Person Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
