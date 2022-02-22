const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/UserRoutes");

dotenv.config();

connectDB();

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/users", UserRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
