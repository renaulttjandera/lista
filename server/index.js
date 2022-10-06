const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const TaskModel = require("./Models/Task");
const UserModel = require("./Models/User");

const port = 3001;

// app.use(
//   session({
//     key: "userId",
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
//     },
//   })
// );

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/lista", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/dashboard/add", async (req, res) => {
  const taskName = req.body.taskName;
  const taskDate = req.body.taskDate;
  const taskTime = req.body.taskTime;
  const taskReminder = req.body.taskReminder;
  const user = req.body.user;
  const taskDone = false;
  const alreadyNotified = false;

  if (validator.isEmpty(taskName) || validator.isEmpty(taskDate) || validator.isEmpty(taskTime)) {
    return res.send({ message: "Incomplete Data" });
  }

  const task = new TaskModel({ taskName, taskDate, taskTime, taskReminder, taskDone, alreadyNotified, user });

  try {
    await task.save();
    res.send("new task");
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const date = new Date();

  const user = await UserModel.findOne({ email: email }).exec();

  if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password)) {
    return res.send({ message: "Incomplete Data" });
  }

  if (user) {
    return res.send({ message: "That Email Address Has Been Taken" });
  }

  if (password !== confirmPassword) {
    return res.send({ message: "Passwords Don't Match" });
  }

  if (password.length > 8 || password.length < 3) {
    return res.send({ message: "Password Must Be 3 - 8 Characters" });
  }

  if (!validator.isEmail(email)) {
    return res.send({ message: "Email Address Isn't Valid" });
  }

  bcrypt.hash(password, 10).then((hash) => {
    const user = new UserModel({ name, email, password: hash, date });
    user.save();
    res.send("New User Created");
  });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({ email: email }).exec();

  if (validator.isEmpty(email) || validator.isEmpty(password)) {
    return res.send({ message: "Incomplete Data" });
  }

  if (!user) {
    return res.send({ auth: false, message: "User Doesn't Exists" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ auth: false, message: "Incorrect Password" });
    } else {
      if (!validator.isEmail(email)) {
        return res.json({ auth: false, message: "Email Address Isn't Valid" });
      } else {
        req.session.auth = { auth: true, user };
        res.send({ auth: true, user });
      }
    }
  });
});

app.get("/signin", (req, res) => {
  if (req.session.auth) {
    res.send(req.session.auth);
  } else {
    res.send({ auth: false });
  }
});

app.get("/dashboard/:id", async (req, res) => {
  const userId = req.params.id;
  TaskModel.find({ user: userId }, (err, result) => {
    if (err) {
      return res.send(err);
    }

    res.send(result);
  });
});

app.put("/dashboard/update", async (req, res) => {
  const taskDone = req.body.taskDone;
  const id = req.body.id;

  try {
    await TaskModel.findById(id, (err, updatedTask) => {
      updatedTask.taskDone = taskDone;
      updatedTask.save();
      res.send("data updated");
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/dashboard/notify", async (req, res) => {
  const alreadyNotified = req.body.alreadyNotified;
  const id = req.body.id;

  try {
    await TaskModel.findById(id, (err, updatedTask) => {
      updatedTask.alreadyNotified = alreadyNotified;
      updatedTask.save();
      res.send("data updated");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/dashboard/delete/:id", async (req, res) => {
  const id = req.params.id;

  await TaskModel.findByIdAndRemove(id).exec();
  res.send("data deleted");
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logout Success");
});

app.listen(port, () => {
  console.log("Listening on Port 3001 | http://localhost:3001");
});
