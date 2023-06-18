const mongoose = require("mongoose");

const FavouriteSchema = mongoose.Schema(
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
    userID: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const FavouriteModel = mongoose.model("favourite", FavouriteSchema);

module.exports = {
  FavouriteModel,
};
