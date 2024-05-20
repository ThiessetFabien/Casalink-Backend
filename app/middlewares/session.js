import userController from "../controllers/userController";

const sessionMiddleware = async (req, res, next) => {
  try {
    // Catch the userId from the session
    const userId = req.session.userId;

    if (!userId) {
      // if the user is not authenticated, respond with a 401 (Unauthorized) error
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Find the user data by its id
    const userData = await userController.findUserByIdWithoutPassword({ id: userId
    }); 

    if (!userData) {
      // if the user is not found, respond with a 404 (Not Found) error
      return res.status(404).json({ error: "User not found" });
    }

    // Add the user data to the request object
    req.user = userData;

    // Continue to the next middleware
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = sessionMiddleware;
