import { AiOutlineDelete } from "react-icons/ai";
import React from "react";

import { Goal } from "@/features/models/Goal";
import { useDeleteGoalMutation } from "@/features/store/goal/goalApi";

const GoalTile: React.FC<{ goal: Goal }> = ({ goal }) => {
  const [deleteGoal] = useDeleteGoalMutation();

  return (
    <div className="flex items-center justify-between w-full px-6 py-3 bg-white rounded shadow ring-2 ring-black/10">
      <p className="font-bold text-blue-800">{goal.text}</p>
      <div>
        <button
          className="p-1 font-bold text-white bg-red-500 rounded shadow ring-2 ring-transparent hover:ring-red-500"
          onClick={() => deleteGoal({ goalId: goal.id })}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
};

export default GoalTile;
