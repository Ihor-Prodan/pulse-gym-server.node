import express from "express";
import {
  getAllTrainers,
  getTrainerById,
} from "../controllers/trainersController";

const router = express.Router();

router.get("/", getAllTrainers);
router.get("/:id", getTrainerById);
