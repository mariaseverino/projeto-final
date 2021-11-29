// require("dotenv").config({
//     path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
// });
// const express = require("express");
// const cors = require("cors");
// const routes = require("./routes");

// const app = express();

// app.use(cors());
// app.use(express.json());
// // app.use(routes);
// require("dotenv").config({
//     path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
// });

const app = require("./app");

const PORT = process.env.NODE_ENV === "test" ? 3336 : 3333;

console.log(PORT);
app.listen(PORT, `running in ${PORT}`);
