// controllers/colorsController.js
const express = require("express");
const colors = express.Router();
const { getAllColors, getColor, createColor, deleteColor, updateColor } = require("../queries/color");
const { checkName, checkBoolean } = require("../validations/checkColors.js");

// INDEX
colors.get("/", async (req, res) => {
    const allColors = await getAllColors();
    if (allColors[0]) {
      res.status(200).json(allColors);
    } else {
      res.status(500).json({ error: "server error" });
    }
//SHOW
    colors.get("/:id", async(req, res) => {
        const { id } = req.params;
        const color = await getColor(id);
        if (color) {
            res.json(color);

        } else {
            res.status(404).json({ error: "not found sucka" });
        }
    });

    // CREATE
colors.post("/", checkName, checkBoolean, async (req, res) => {
    try{

        const color = await createColor(req.body);
        res.json(color);
    } catch (error) {
        res.status(400).json({ error: error })
    }
  });
  // controllers/colorController.js
// DELETE
colors.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedColor = await deleteColor(id);
    if (deletedColor.id) {
        res.status(200).json({ id });
        
    } else {
        res.status(404).json("Color not found")
    }
  });

  // UPDATE
colors.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedColor = await updateColor(id, req.body);
    res.status(200).json(updatedColor);
  });

  });

module.exports = colors;