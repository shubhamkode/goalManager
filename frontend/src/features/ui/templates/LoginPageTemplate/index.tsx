import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toast";

import { Page } from "@/features/ui/components";
import { setCredentials } from "@/features/store/auth/authSlice";
import { useUserLoginMutation } from "@/features/store/auth/authApi";

const loginPageSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type FormData = yup.InferType<typeof loginPageSchema>;

export default function RegisterPage() {
  const dispatch = useDispatch();

  const [login] = useUserLoginMutation();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(loginPageSchema) });

  const submitHandler = async () => {
    const formData = getValues();
    await login({ ...formData })
      .unwrap()
      .then((data) => {
        const { token } = data;
        dispatch(setCredentials(token));
        reset();
        toast.success("Login Success");
      });

  };

  return (
    <Page>
      <div className="flex flex-col items-center justify-around p-2 sm:flex-row h-[100%]">
        <div className="w-full p-2 mb-10 space-y-3 text-center sm:w-fit sm:mb-0">
          <h2 className="text-3xl font-bold text-blue-800 sm:mb-0">Login</h2>
          <h3 className="text-lg font-bold text-blue-800/80">Welcome Back</h3>
        </div>
        <form
          className=" p-4 space-y-2  rounded shadow py-10 ring-2 ring-offset-4 ring-blue-800 bg-blue-100/20 w-[450px]"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="w-full p-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`inputField ${errors?.email && "ring-2 ring-red-400"}`}
              placeholder="Enter your email"
            />
            <p className="errorMessage">{errors?.email?.message}</p>
          </div>

          <div className="w-full p-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`inputField ${
                errors?.password && "ring-2 ring-red-400"
              }`}
              placeholder="Enter your Password"
            />
            <p className="errorMessage">{errors?.password?.message}</p>
          </div>
          <div className="w-full p-2 pt-4">
            <button className="w-full py-2 mt-2 font-bold text-white bg-blue-800 rounded-full shadow">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Page>
  );
}
