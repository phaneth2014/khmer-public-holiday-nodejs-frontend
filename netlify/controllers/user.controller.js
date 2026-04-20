
import User from '../models/user.js';
import pool from '../config/db.js';

export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

