const express = require('express');
const connectDB = require('./Server/config/db');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './Server/view/');

connectDB();

app.use(express.static(path.join(__dirname, 'Server/view/')));

app.get('/', (req, res) => {
  return res.render('homepage');
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));