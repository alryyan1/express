const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const FCM = require("fcm-node");

var serverKey = require("../ibnziad-96d87-firebase-adminsdk-1i9bl-688d7509bc.json"); //put the generated private key path here

var fcm = new FCM(serverKey);
const token =
  "flFORkySSoOTJwLMLvfvXE:APA91bHHx3MmiXA6DF_q3yGa6XZWe6GsPrQD3yX-DLboTLVBsonSfh0f3y5NMf_HL-h3GERxPoOCfuYbruMeOULC8ffjG5A-1AFiZ4p3y1Q2IITHuBJLThzS5tvkcmg9r84a_rQgGezR";
var message = {
  //this may vary according to the message type (single recipient, multicast, topic, et cetera)
  to: token,

  notification: {
    title: "Node js ",
    body: "Message from node js",
  },

  data: {
    //you can send only notification or only data(or include both)
    my_key: "my value",
    my_another_key: "my another value",
  },
};

// CREATE USERS
let users = fs.readFileSync("./users.json", "utf-8");
users = JSON.parse(users);

// REQUEST RESPONSE CYCLES
const createUser = (req, res) => {
  const newUser = req.body;
  console.log(req.body);
  console.log(newUser);
  const lastId = users.length + 1;
  const modifeduser = Object.assign(newUser, { id: lastId });
  users.push(modifeduser);
  console.log(req.body);
  res.status(200).json(users);
};

const getUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  let find = users.find((user) => user.id == id);
  console.log(find);
  res.json(find);
};
const getUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: users,
    },
  });
};
const dltUser = (req, res) => {
  users = users.filter((user) => user.id == req.params.id);
  res.json({
    status: "success",
    message: "deleted successfully",
  });
};
const gameById = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  res.send(id);
};
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).delete(dltUser);
router.route("/games/download").get((req, res) => {
  res.download(path.resolve("1.jpg"));
});

router.route("/api/send").get((req, res, next) => {
  console.log("send");

  console.log;
  fcm.send(message, function (err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });

  next();
});

module.exports = router;
