import { User } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res.status(400).json({
        message: 'Fill all the fields',
      });
    }

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      return res.status(400).json({
        message: 'User ALready Exist',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: 'User Registered Successfully',
      user: {
        id: createUser._id,
        username: createUser.username,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: '10h' }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      message: 'User Logged In Successfully',
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { register, login };
