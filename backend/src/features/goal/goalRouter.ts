import express, { Router } from "express";
import { GoalController } from "./goalController";

export const goalRouter: Router = express.Router();

goalRouter
  .route("/")
  .get(GoalController.getAllGoals)
  .post(GoalController.createNewGoal);

goalRouter
  .route("/:id")
  .get(GoalController.getGoalById)
  .put(GoalController.updateGoalById)
  .delete(GoalController.deleteGoalById);
