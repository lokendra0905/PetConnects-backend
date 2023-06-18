const express = require("express");
const { FavouriteModel } = require("../Models/Favourite.Model");
const FavouiteRouter = express.Router();

FavouiteRouter.get("/", async (req, res) => {
  try {
    const Favourites = await FavouriteModel.find({ userID: req.body.userID });

    res.status(200).send(Favourites);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

FavouiteRouter.post("/addFavourite", async (req, res) => {
  try {
    const Favourite = new FavouriteModel(req.body);
    await Favourite.save();
    res.status(200).send({ message: "Added to favourite" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

FavouiteRouter.post("/delete/:petId", async (req, res) => {
  const { petId } = req.params;
  try {
    await PetModel.findByIdAndDelete({ _id: petId });
    res.status(200).send({ msg: `The Pet has been deleted.` });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = { FavouiteRouter };
