require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();

const server = http.createServer(app);

const loginRoute = require("./router");

app.use(loginRoute);

const PORT = parseInt(process.env.NODE_APP_PORT)

server.listen(PORT || 8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
