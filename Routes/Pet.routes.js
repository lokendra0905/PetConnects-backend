const express = require("express");
const { PetModel } = require("../Models/Pet.Model");
const { auth } = require("../Middleware/auth");
const PetRouter = express.Router();

PetRouter.get("/", async (req, res) => {
  try {
    const {
      breed,
      gender,
      age,
      color,
      size,
      price,
      type,
      sortBy,
      sortOrder,
      location,
      page,
      limit,
      search,
    } = req.query;
    const pets = await PetModel.find({});

    let filteredData = pets;

    //  Filtering the Data

    if (breed) {
      filteredData = filteredData.filter(
        (pet) => pet.breed.toLowerCase() === breed.toLowerCase()
      );
    }
    if (gender) {
      filteredData = filteredData.filter(
        (pet) => pet.gender.toLowerCase() === gender.toLowerCase()
      );
    }
    if (age) {
      filteredData = filteredData.filter(
        (pet) => pet.age.toLowerCase() === age.toLowerCase()
      );
    }

    if (size) {
      filteredData = filteredData.filter(
        (pet) => pet.size.toLowerCase() === size.toLowerCase()
      );
    }
    if (type) {
      filteredData = filteredData.filter(
        (pet) => pet.type.toLowerCase() === type.toLowerCase()
      );
    }
    if (location) {
      filteredData = filteredData.filter(
        (pet) => pet.location.toLowerCase() === location.toLowerCase()
      );
    }
    if (color) {
      filteredData = filteredData.filter(
        (pet) => pet.color.toLowerCase() === color.toLowerCase()
      );
    }
    //  Sorting the Data
    if (sortBy) {
      const order = sortOrder === "desc" ? -1 : 1;
      filteredData.sort((a, b) => (a[sortBy] > b[sortBy] ? order : -order));
    }
    // Searching Data
    if (search) {
      const searchQuery = search.toLowerCase();

      filteredData = filteredData.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchQuery) ||
          pet.breed.toLowerCase().includes(searchQuery) ||
          pet.color.toLowerCase().includes(searchQuery) ||
          pet.type.toLowerCase().includes(searchQuery) ||
          pet.location.toLowerCase().includes(searchQuery) ||
          pet.size.toLowerCase().includes(searchQuery) ||
          pet.gender.toLowerCase().includes(searchQuery) ||
          pet.age.toLowerCase().includes(searchQuery) ||
          pet.health.toLowerCase().includes(searchQuery) ||
          pet.price.includes(searchQuery)
      );
    }

    // Paginating data

    const currentPage = parseInt(page) || 1;
    const limitPerPage = parseInt(limit) || 10;
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = currentPage * limitPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    res.status(200).send({
      data: paginatedData,
      totalData: filteredData.length,
      totalPages: Math.ceil(filteredData.length / limitPerPage),
      currentPage,
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

PetRouter.get("/:petId", async (req, res) => {
  const { petId } = req.params;
  try {
    const pet = await PetModel.find({ _id: petId });

    res.status(200).send(pet);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

PetRouter.use(auth);

PetRouter.post("/addPet", auth, async (req, res) => {
  try {
    const pet = new PetModel(req.body);
    await pet.save();
    res.status(200).send({ msg: "New Pet has been Added" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

PetRouter.patch("/update/:petId", async (req, res) => {
  const { petId } = req.params;
  try {
    await PetModel.findByIdAndUpdate({ _id: petId }, req.body);
    res
      .status(200)
      .send({ msg: `The pet with id: ${petId} has been updated.` });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

PetRouter.delete("/delete/:petId", async (req, res) => {
  console.log(req.body.userID);
  const { petId } = req.params;
  try {
    await PetModel.findByIdAndDelete({ _id: petId });
    res
      .status(200)
      .send({ msg: `The pet with id: ${petId} has been deleted.` });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = { PetRouter };
