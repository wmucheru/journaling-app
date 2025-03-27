import {
  comparePassword,
  generateJWTToken,
  hashPassword,
} from "../../utils/auth.utils.js";
import { User } from "./user.model.js";

export const UserController = {};

/**
 *
 * Register
 *
 */
UserController.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "Name, email and password are required",
      });
    }

    // Check if user exists
    const exists = await User.getOneByEmail(email);

    if (exists?.id) {
      return res.status(400).json({
        error: true,
        message: "This email has already been used to register",
      });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Save user
    const user = await User.insert({
      name,
      email,
      password: passwordHash,
    });

    return res.status(201).send({
      user,
      message: "Account was created successfully",
    });
  } catch (e) {
    console.log("USER_REGISTER_ERROR: ", e);

    return res.status(500).send({
      error: true,
      message: "Could not register user",
    });
  }
};

/**
 *
 * Login
 *
 */
UserController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Enter valid email and password",
      });
    }

    // Check if user exists
    const exists = await User.getOneByEmail(email);
    console.log(exists);

    if (!exists?.id) {
      return res.status(400).json({
        error: true,
        message: "No account found with this email",
      });
    }

    // Login user and generate token
    const user = await User.loginUser(email, password);

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Incorrect password",
      });
    }

    const token = generateJWTToken(user);

    return res.status(200).send({ user, token });
  } catch (e) {
    console.log("USER_LOGIN_ERROR: ", e);

    return res.status(500).send({
      error: true,
      message: "Could not login user",
    });
  }
};

/**
 *
 * Fetch user(s)
 *
 */
UserController.get = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const user = await User.getOneById(id);
      return res.status(200).json(user);
    } else {
      const users = await User.getAll(req.query);
      return res.status(200).json(users);
    }
  } catch (e) {
    console.log("USER_FETCH_ERROR: ", e);

    return res.status(500).send({
      error: true,
      message: "Could not fetch entries(s)",
      log: e,
    });
  }
};

/**
 *
 * Get account
 *
 */
UserController.getAccount = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (e) {
    console.log("ACCOUNT_FETCH_ERROR: ", e);

    return res.status(500).send({
      error: true,
      message: "Could not fetch entries(s)",
      log: e,
    });
  }
};

/**
 *
 * Update user
 *
 */
UserController.update = async (req, res) => {
  const obj = req.body;

  try {
    const user = await User.update(obj);

    return res.status(200).send({
      user,
      message: "Account updated",
    });
  } catch (e) {
    console.log("USER_UPDATE_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: e,
    });
  }
};
