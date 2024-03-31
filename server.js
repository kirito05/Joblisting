const express = require("express");
const db = require("./Database/db");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const User = require("./Models/user");
const resisterRoute = require("./Routes/Auth");

app.use(express.json());

app.get("/api", (req, res) => {
  try {
    res.json({
      Service: "Job Listing Server",
      Status: "Active",
      Time: new Date().toLocaleString(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      Service: "Job Listing Server",
      Status: "Inactive",
      Time: new Date().toLocaleString(),
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      Service: "Job Listing Server",
      Status: "Inactive",
      Time: new Date().toLocaleString(),
    });
  }
});

app.use("/api/v1/auth",resisterRoute);

app.listen(process.env.PORT || 3000, () => {
    db()
        .then(() => console.log("Database connected successfully"))
        .catch((err) => console.log("Database connection failed", err));
    console.log(`server is up and running at ${process.env.PORT || 3000}`);
});
