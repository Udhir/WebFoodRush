const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  } catch (e) {
    res.status(500).json({
      message: "Authorization Failed",
      error: e.message,
    });
  }
};

module.exports = {
  isAdmin,
};