const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./Routes/User.routes");
const { PetRouter } = require("./Routes/Pet.routes");
const { FavouiteRouter } = require("./Routes/Favourite.routes");
const { ShelterRouter } = require("./Routes/Shelter.routes");

const app = express();

require("dotenv").config;

app.use(cors());
app.use(express.json());

app.use("/shelters", ShelterRouter);
app.use("/users", userRouter);
app.use("/pets", PetRouter);
app.use("/favourites", FavouiteRouter);

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log("Connected to Database Successfully");
  } catch (error) {
    console.log("Cannot Connect to Datatbase");
  }
});
