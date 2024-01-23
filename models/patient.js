const mongoose = require("../database");

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
    unique: false,
    default: 1,
  },
  address: {
    type: String,
    default: "",
  },
});

patientSchema.methods.sayName = () => {
  console.log(this.name);
};

const patientModel = mongoose.model("patient", patientSchema);

module.exports = patientModel;
// const ali = new patientModel({ name: "ali" });
