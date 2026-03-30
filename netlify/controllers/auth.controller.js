import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'; // Use bcryptjs for better compatibility
import dotenv from "dotenv";
import pool from "../config/database.js";

dotenv.config();

export async function register(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // 1. Validation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    // 2. Check existence
    const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists with this email!" });
    }

    // 3. Hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Insert (Note the variable name change to 'result' for clarity)
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, 'user'] // Default role added
    );

    // Extract the actual user record
    const user = result.rows[0];

    // 5. Sign Token (Using the data from 'user')
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "4a73bb24-f705-48e4-aa5e-8356245cfb5a",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // 6. Success Response
    res.status(201).json({
      token,
      data: user, // Sends back the user info without the password
      message: "Registration successful!"
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Internal Server Error", message: err });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    // Laravel hashes often start with $2y$. 
    // bcryptjs handles $2y$ and $2b$ identically.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Success...
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "4a73bb24-f705-48e4-aa5e-8356245cfb5a",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    delete user.password;
    res.status(200).json({ data: user, token, message: "Logon your user successed" });

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", message:err });
  }
}

export const checkToken = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  // Decode without verifying the signature (don't use this for security checks!)
  const decoded = jwt.decode(token);

  if (decoded && decoded.exp) {
    const expirationDate = new Date(decoded.exp * 1000);
    const isExpired = Date.now() > expirationDate.getTime();

    console.log(`Expires at: ${expirationDate}`);
    console.log(`Is it expired? ${isExpired}`);
    res.status(200).json({ decoded,expire_at:expirationDate,token, message: "success" });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCheck(req, res) {
  try {
        res.status(200).json({message:"users route is working from user controller"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // const token = jwt.sign(
    //   { id: user.id, email: user.email, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: process.env.JWT_EXPIRES_IN || "1D" }
    // );

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.body.token;
    if (token) {
      const decoded = jwt.decode(token);
      const expiresIn = decoded.exp - (Date.now() / 1000); // Time left until expiry in seconds
      // Add the token to the blacklist with its remaining TTL
      // await redisClient.set(token, 'blacklisted', {
      //   EX: expiresIn > 0 ? expiresIn : 1 // Ensure a positive expiration
      // });
      res.status(200).json({ status: "logged out" });
    }
    // Clear the cookie/send success response

  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
}