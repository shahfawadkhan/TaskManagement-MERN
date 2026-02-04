import jwt from 'jsonwebtoken';

const verifyUser = async (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export { verifyUser };
