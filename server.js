const express = require("express");
const db = require("./Database/db");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const resisterRoute = require("./Routes/Auth");
const jobRoute = require("./Routes/job");
const allDetailsRoute = require("./Routes/Details");

app.use(express.json());

app.use("/api/v1/auth", resisterRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1", allDetailsRoute);

app.listen(process.env.PORT || 3000, () => {
  db()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Database connection failed", err));
  console.log(`server is up and running at ${process.env.PORT || 3000}`);
});
