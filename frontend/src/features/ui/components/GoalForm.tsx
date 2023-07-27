import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toast";

// import axiosClient from "@/features/config/axiosClient";
// import { RootState } from "@/features/store";
// import { add } from "@/features/store/goal/goalSlice";

import { useCreateGoalMutation } from "@/features/store/goal/goalApi";

const goalFormSchema = yup.object({
  text: yup.string().required(),
});

type FormData = yup.InferType<typeof goalFormSchema>;

const GoalForm = () => {
  // const dispatch = useDispatch();
  // const { userToken } = useSelector((state: RootState) => state.auth);
  const [createGoal, { isSuccess }] = useCreateGoalMutation();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(goalFormSchema) });

  const submitHandler = async () => {
    const formData = getValues();
    await createGoal({ ...formData })
      .unwrap()
      .then(() => {
        reset();
        toast.success("Goal Added Successfully");
      });
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-lg mx-auto mt-10 space-y-5"
    >
      <div className="w-full">
        <label htmlFor="text"> New Goal</label>
        <input
          type="text"
          className="mt-2 inputField ring-2 ring-blue-800"
          {...register("text")}
          placeholder="Enter your Goal"
        />
        <p className="errorMessage">{errors.text?.message}</p>
      </div>
      <button className="w-full py-3 text-sm font-bold text-white bg-blue-800 rounded-full ">
        Submit
      </button>
    </form>
  );
};

export default GoalForm;
