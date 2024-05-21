const isLoggedMiddleWare = (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/connexion");
    } else {
      next();
    }
  };
  
export default isLoggedMiddleWare;