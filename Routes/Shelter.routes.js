const express = require("express");
const { ShelterModel } = require("../Models/Shelter.Model");
const ShelterRouter = express.Router();

ShelterRouter.get("/", async (req, res) => {
  try {
    const { type, sortBy, sortOrder, location, page, limit, search } =
      req.query;
    const Shelters = await ShelterModel.find({});

    let filteredData = Shelters;

    //  Filtering the Data

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
          pet.type.toLowerCase().includes(searchQuery) ||
          pet.location.toLowerCase().includes(searchQuery) ||
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
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  ShelterRouter,
};
