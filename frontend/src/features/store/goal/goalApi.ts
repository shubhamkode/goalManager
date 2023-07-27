import { Goal } from "@/features/models/Goal";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/v1/api",
  prepareHeaders(headers, api) {
    const userToken = (api.getState() as RootState).auth.userToken;
    headers.set("Authorization", `Bearer ${userToken}`);
  },
});

export const goalApi = createApi({
  reducerPath: "goalsApi",
  baseQuery,
  tagTypes: ["GOALS"],
  endpoints: (builder) => ({
    getAllGoals: builder.query<Goal[], void>({
      query: () => "/goal",
      transformResponse: (response: { data: Goal[] }) => response.data,
      providesTags: [{ type: "GOALS", id: "getAllGoals" }],
    }),
    createGoal: builder.mutation<void, { text: string }>({
      query: ({ text }) => {
        return { method: "POST", url: "/goal", body: { text } };
      },
      invalidatesTags: [{ type: "GOALS", id: "getAllGoals" }],
    }),
    updateGoal: builder.mutation<void, Partial<Goal>>({
      query: (goal) => {
        return {
          method: "PUT",
          url: `/goal/${goal.id}`,
          body: { text: goal.text },
        };
      },
      invalidatesTags: [{ type: "GOALS", id: "getAllGoals" }],
    }),
    deleteGoal: builder.mutation<void, { goalId: string }>({
      query: ({ goalId }) => {
        return { method: "DELETE", url: `/goal/${goalId}` };
      },
      invalidatesTags: [{ type: "GOALS", id: "getAllGoals" }],
    }),
  }),
});

export const {
  useGetAllGoalsQuery,
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useUpdateGoalMutation,
} = goalApi;
