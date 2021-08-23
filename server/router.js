const { Router } = require("express");
const router = Router();

const { scrape } = require("./scrape.controller");

router.get("/", scrape);

module.exports = router;
