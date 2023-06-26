const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = db.users;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      message: "aaaaaaa",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({ message: "fail" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: `${req.params.id}` }, include: ["todoEl"] });
    res.status(200).json({
      message: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({ message: "fail" });
  }
};

const createUser = async (req, res) => {
  let info = {
    name: req.body.name,
    password: req.body.password,
  };
  const user = await User.create(info);
  res.status(200).json({
    message: "success",
    data: {
      user,
    },
  });
};

const logIn = async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  let token;
  try {
    const user = await User.findOne({ where: { name: `${name}` } });
    if (user != null) {
      if (user.password === password) {
        token = jwt.sign({ userId: user.id }, "SECRET");
        res.status(200).json({ token, user });
      }
    } else {
      res.status(404).json({ message: "fail" });
    }
  } catch (err) {
    res.status(404).json({ message: "fail" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  logIn,
};
