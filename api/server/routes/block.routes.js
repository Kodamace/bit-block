const express = require("express");
const Routes = express.Router();
const blockController = require("../controllers/block.controller");

Routes.get("/:time", blockController.getBlocks);
Routes.get("/search", blockController.searchBlocks);
Routes.get("/:block_hash", blockController.getSingleBlock);

module.exports = Routes;
