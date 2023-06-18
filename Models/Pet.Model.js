const mongoose = require("mongoose");

const PetSchema = mongoose.Schema(
  {
    image: { type: [String] },
    name: { type: String },
    gender: { type: String },
    age: { type: String },
    location: { type: String },
    breed: { type: String },
    size: { type: String },
    color: { type: String },
    type: { type: String },
    price: { type: Number },
    health: { type: String },
    status: { type: String, default: "Available" },
  },
  {
    versionKey: false,
  }
);

const PetModel = mongoose.model("pet", PetSchema);

module.exports = {
  PetModel,
};
