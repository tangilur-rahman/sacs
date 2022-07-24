// external modules
const express = require("express");
require("dotenv").config();

// internal modules
const customErrorHandler = require("./middleware/errorHandler");

// express server
const app = express();

// application-level middleware
app.use(express.json());

// router


// error handler
app.use(customErrorHandler);

// listening port
const port = process.env.PORT || 4000;

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`)
})
