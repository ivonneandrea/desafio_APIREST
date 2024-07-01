// src/controllers/joyasController.js
import { joyaModel } from "../models/joyas.Model.js";
import { getDatabaseError } from "../helpers/database.error.js";
import prepareHateoas from "../helpers/hateoas.js";

const read = async (req, res) => {
  try {
    const { order_by, limits, page } = req.query;
    const joyas = await joyaModel.getAll(order_by, limits, page);
    const joyasWithHateoas = await prepareHateoas("joyas", joyas);
    return res.status(200).json(joyasWithHateoas);
  } catch (error) {
    console.log("error", error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "🔥 Internal server error 🔥" });
  }
};

const readById = async (req, res) => {
  try {
    const { id } = req.params;
    const joya = await joyaModel.getById(id);
    res.status(200).json(joya);
  } catch (error) {
    console.log("error", error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "🔥 Internal server error 🔥" });
  }
};

const readFiltered = async (req, res) => {
  try {
    const { precio_max, precio_min, categoria, metal } = req.query;
    const filters = { precio_max, precio_min, categoria, metal };
    const joyas = await joyaModel.getAllFiltered(filters);
    res.status(200).json(joyas);
  } catch (error) {
    console.log("error", error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "🔥 Internal server error 🔥" });
  }
};

export const joyasController = {
  read,
  readById,
  readFiltered,
};
