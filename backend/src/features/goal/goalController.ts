import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../../config/db";
import { Goal } from "@prisma/client";
import createHttpError from "http-errors";

const { goal } = prisma;

//@desc Get All Goals
//route GET /v1/api/goal
//@access Private
const getAllGoals: RequestHandler<unknown, { data: Goal[] }, unknown, unknown> =
  asyncHandler(async (req, res) => {
    const { userId } = res.locals;
    const goals = await goal.findMany({ where: { userId } });
    res.status(200).json({ data: goals });
  });

//@desc Get Goal By Id
//route GET /v1/api/goal/:id
//@access Private
const getGoalById: RequestHandler<
  { id: string },
  { data: Goal },
  unknown,
  unknown
> = asyncHandler(async (req, res) => {
  const { userId } = res.locals;
  const goalById = await goal.findUnique({
    where: { id: req.params.id, userId },
  });
  if (!goalById) {
    throw createHttpError(400, `Goal Not Found`);
  }
  res.status(200).json({ data: goalById });
});

//@desc Create New Goal
//route POST /v1/api/goal
//@access Private
const createNewGoal: RequestHandler<
  unknown,
  { data: Goal },
  { text: string },
  unknown
> = asyncHandler(async (req, res) => {
  const { userId } = res.locals;

  const newGoal = await goal.create({
    data: { text: req.body.text, userId },
  });
  res.status(200).json({ data: newGoal });
});

//@desc Delete Goal By Id
//route DELETE /v1/api/goal/:id
//@access Private
const deleteGoalById: RequestHandler<
  { id: string },
  { data: Goal },
  unknown,
  unknown
> = asyncHandler(async (req, res) => {
  const { userId } = res.locals;
  const deletedGoal = await goal.delete({
    where: { id: req.params.id, userId },
  });
  if (!deletedGoal) {
    throw createHttpError(400, "Goal Not Found...");
  }
  res.status(200).json({ data: deletedGoal });
});

//@desc Update Goal By Id
//route PUT /v1/api/goal
//@access Private
const updateGoalById: RequestHandler<
  { id: string },
  { data: Goal },
  { text?: string },
  unknown
> = asyncHandler(async (req, res) => {
  const { userId } = res.locals;
  const updatedGoal = await goal.update({
    where: { id: req.params.id, userId },
    data: { text: req.body.text },
  });
  res.status(200).json({ data: updatedGoal });
});

export const GoalController = {
  getAllGoals,
  getGoalById,
  createNewGoal,
  deleteGoalById,
  updateGoalById,
};
