const checkUserRole = (req, res, next) => {
    const { role } = req.user;

    if (role === 'admin' || role === 'adult') {
        next();
    } else {
        return res.status(403).json({
            message: 'You do not have permission to access this page'
        });
    }
};

export default checkUserRole;
