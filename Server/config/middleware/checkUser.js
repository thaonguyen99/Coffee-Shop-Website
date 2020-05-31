const checkUser = (req,res,next) => {
  if(req.session.user){
    user = req.session.user;
  }
  else{
    user = null;
  }
  next();
}

module.exports = checkUser;