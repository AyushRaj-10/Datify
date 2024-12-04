const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const bcrypt = require("bcrypt"); // Import bcrypt
const userModel = require("./models/datify");
const Confession = require('./models/confession');

const app = express();
const PORT = 3001;

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from React
app.use("/uploads", express.static(uploadDir)); // Serve uploaded images statically

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Set destination folder to "uploads"
  },
  filename: (req, file, cb) => {
    const filename = `photo-${Date.now()}.${file.mimetype.split("/")[1]}`; // Create a unique filename
    cb(null, filename);
  },
});

const upload = multer({ storage });

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/datify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ** API Endpoints **

// Register route
app.post("/register", upload.single("photo"), async (req, res) => {
  const { name, email, college, gender, insta, password, age, bio } = req.body;
  const photo = req.file ? req.file.filename : null; // Use the filename from multer

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const user = await userModel.create({
      name,
      email,
      college,
      gender,
      insta,
      password: hashedPassword, // Store the hashed password
      photo,
      age,
      bio,
    });

    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        // Compare hashed password with entered password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (isMatch) {
            res.json("success");
          } else {
            res.json("password is incorrect");
          }
        });
      } else {
        res.json("no record existed");
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Fetch users route for Swipeable Cards
app.get("/api/users", (req, res) => {
  userModel
    .find({}, "name age photo bio insta gender") // Fetch only name, age, photo, and bio
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// POST confession route
app.post('/api/confessions', async (req, res) => {
  try {
      const { message } = req.body;
      if (!message) return res.status(400).json({ error: 'Message is required' });

      const newConfession = new Confession({ message });
      await newConfession.save();
      res.status(201).json(newConfession);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET confessions route
app.get('/confess', async (req, res) => {
  try {
      const confessions = await Confession.find().sort({ createdAt: -1 }).limit(50);
      res.json(confessions);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
