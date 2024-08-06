import express from "express";
import {
  getAllWorkout,
  getWorkoutById,
} from "../controllers/workoutContriller";

const router = express.Router();

router.get("/", getAllWorkout);
router.get("/:id", getWorkoutById);
