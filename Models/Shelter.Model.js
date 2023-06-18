const mongoose = require("mongoose");

const ShelterSchema = mongoose.Schema(
  {
    image: { String },
    name: { type: String },
    location: { type: String },
    capacity: { type: Number },
    type: { type: String },
    price: { type: Number },
    rating: { type: Number },
    revenue: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

const ShelterModel = mongoose.model("shelter", ShelterSchema);

module.exports = {
  ShelterModel,
};
