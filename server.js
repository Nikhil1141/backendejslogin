require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err);
    });

// MongoDB User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Handle signup POST request
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ name: username });
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name: username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
});

// Handle login POST request
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ name: username });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






// require('dotenv').config();  // Load environment variables

// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');

// const app = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// // Check the MongoDB URI
// console.log('MongoDB URI:', process.env.MONGODB_URI); // Debugging line

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => {
//         console.log('MongoDB connected successfully');
//     })
//     .catch((err) => {
//         console.error('MongoDB connection failed:', err);
//     });

// // MongoDB User Schema
// const UserSchema = new mongoose.Schema({
//     name: String,
//     password: String,
// });

// const User = mongoose.model('User', UserSchema);

// // Routes
// app.get('/', (req, res) => {
//     res.render('login');
// });

// // Handle login POST request
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ name: username });
//     if (!user) {
//         return res.send('User not found');
//     }

//     // Check if password matches
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (isMatch) {
//         res.send('Login successful');
//     } else {
//         res.send('Invalid credentials');
//     }
// });

// // Handle signup POST request (for testing)
// app.post('/signup', async (req, res) => {
//     const { username, password } = req.body;

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name: username, password: hashedPassword });

//     await newUser.save();
//     res.send('User created successfully');
// });

// // Start server
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log('Server running on port 3000');
// });










// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');

// const app = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// // MongoDB connection
// mongoose.connect('mongodb+srv://Pymongo:Nikhil.1141@cluster0.zd3fe76.mongodb.net/db1')
//     .then(() => {
//         console.log('MongoDB connected successfully');
//     }).catch((err) => {
//         console.error('MongoDB connection failed:', err);
//     });

// // MongoDB User Schema
// const UserSchema = new mongoose.Schema({
//     name: String,
//     password: String,
// });

// const User = mongoose.model('User', UserSchema);

// // Route for Signup Form (inserts login details)
// app.get('/signup', (req, res) => {
//     res.render('signup'); // renders the signup form
// });

// // Handle Signup POST request
// app.post('/signup', async (req, res) => {
//     const { username, password } = req.body;

//     // Check if username already exists
//     const existingUser = await User.findOne({ name: username });
//     if (existingUser) {
//         return res.send('User already exists');
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user and save to MongoDB
//     const newUser = new User({ name: username, password: hashedPassword });
//     await newUser.save();

//     res.send('User created successfully');
// });

// // Start server
// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });
