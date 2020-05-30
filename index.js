const express = require('express');
const connectDB = require('./Server/config/db');
const bodyParser = require('body-parser');
const path = require('path');
const route = require('./Server/route');
const dotenv = require('dotenv');
const auth = require('./Server/config/middleware/auth');

const app = express();


dotenv.config({ path: './Server/config/config.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', './Server/view/');

connectDB();

app.use(express.static(path.join(__dirname, 'Server/view/')));

app.use('/', route);

app.get('/', auth, (req, res) => {
  console.log(req.user);
  return res.render('homepage');
})

app.get('/login', (req, res) => {
  return res.render('login');
})

app.get('/register', (req, res) => {
  return res.render('register');
})

app.get('/product', (req, res) => {
  return res.render('product');
})

app.get('/contact', (req, res) => {
  return res.render('contact');
})

app.get('/about', (req, res) => {
  return res.render('about');
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
