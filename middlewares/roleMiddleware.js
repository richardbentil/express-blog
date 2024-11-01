const requireRole = (role) => {
  return (req, res, next) => {
    const { role: userRole } = req.user;

    //console.log(req.user, role)

    if (userRole !== role) {
      res.status(403).send({ message: "Forbidden" });
      return;
    }

    next();
  };
};


module.exports = requireRole;