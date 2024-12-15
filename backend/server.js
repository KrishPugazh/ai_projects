const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/auth_demo')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Session Store
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/auth_demo',
  collection: 'sessions',
});

// Session Middleware
app.use(
  session({
    secret: 'Franklinisacoder',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: track which user submitted
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', ContactSchema);

// User Registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.send('User registered successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user.');
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password.');

    req.session.userId = user._id;

    res.send('Login successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in.');
  }
});

// User Logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send('Error logging out.');
    res.send('Logout successful!');
  });
});

// Protected Dashboard Route
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized. Please log in.');
  }
  res.send('Welcome to your dashboard!');
});

// Contact Form Submission
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save contact form data
    const newContact = new Contact({
      name,
      email,
      message,
      userId: req.session.userId || null, // Associate with logged-in user if available
    });
    await newContact.save();

    res.status(201).send('Message submitted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting message.');
  }
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
