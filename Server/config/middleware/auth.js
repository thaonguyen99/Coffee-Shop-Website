const jwt = require('jsonwebtoken');
const cookieSession = require('cookie-session');



module.exports = function (req, res, next) {
  //Get token from header
  const token = req.headers['token'];
  console.log(req.headers.token);
  //Check if not token
  if (!token) {
    return res.render('homepage', { user: null });
  }

  //Verified token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;
    next();
  }
  catch (e) {
    res.status(401).json({ msg: 'Token is not valid' })
  }

}