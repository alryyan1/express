const express = require("express");
const router = express.Router();
const model = require("../models/patient");

router
  .route("/")
  .get((req, res) => {
    model
      .find()
      .then((val) => {
        console.log(val);
        res.send(val);
      })
      .catch((err) => {
        res.status(400).json({
          status: "fail",
          message: err.message,
        });
      });
  })
  .post((req, res) => {
    console.log(req.reqTime);
    const p = new model({
      name: req.body.name,
      age: req.body.age,
    });
    p.save().then((obj) => {
      res.json({
        status: "success",
        data: obj,
      });
    });
  });

router.route("/");
router.route("/delete").get((req, res) => {
  model.deleteMany({}).then(() => {
    res.send("deleted");
  });
});

//delete patient from mongoDb
//  router.route("/:id").delete((req,res)=>{
//     const id = req.params.id;

//  })
module.exports = router;
