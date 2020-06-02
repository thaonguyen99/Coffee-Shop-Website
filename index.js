const express = require('express');
const connectDB = require('./Server/config/db');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./Server/route');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const checkUser = require('./Server/config/middleware/checkUser');
const migrate = require('migrate');
const path = require('path');

const app = express();


dotenv.config({ path: './Server/config/config.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', './Server/view/');

connectDB();

app.use(express.static(path.join(__dirname, 'Server/view/')));

app.use(expressSession({
  secret: 'DPQ',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 10 * 60 * 1000 // milli
  }
}));

app.use('/', routes);



app.get('/', checkUser, (req, res) => {
  return res.render('homepage', user);
})

app.get('/login', (req, res) => {
  return res.render('login');
})

app.get('/register', (req, res) => {
  return res.render('register');
})


app.get('/contact', checkUser, (req, res) => {
  return res.render('contact', { user });
})

app.get('/about', checkUser, (req, res) => {
  return res.render('about', { user });
})




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
