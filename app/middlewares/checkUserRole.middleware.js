/* eslint-disable consistent-return */
const checkAdminOrAdultRole = (req, res, next) => {
  const { role } = req.user;

  if (role === 'admin' || role === 'adult') {
    next();
  } else {
    return res.status(403).json({
      message: 'You do not have permission to access this page',
    });
  }
};

const checkAdminRole = (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      message: 'You do not have permission to access this page',
    });
  }
};

const checkAdultOrChildRole = (req, res, next) => {
  const { role } = req.user;

  if (role === 'adult' || role === 'child' || role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      message: 'You do not have permission to access this page',
    });
  }
};

export { checkAdminOrAdultRole, checkAdultOrChildRole, checkAdminRole };
