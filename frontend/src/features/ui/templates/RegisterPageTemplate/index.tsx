import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toast";

import { Page } from "@/features/ui/components";
import { setCredentials } from "@/features/store/auth/authSlice";
import { useUserRegisterMutation } from "@/features/store/auth/authApi";

const registerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type FormData = yup.InferType<typeof registerSchema>;

export default function RegisterPageTemplate() {
  const dispatch = useDispatch();
  const [registerUser] = useUserRegisterMutation();

  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(registerSchema) });

  const clearFormData = () => {
    reset();
    setConfirmPassword("");
  };

  const submitHandler = async () => {
    const formData = getValues();
    if (formData.password !== confirmPassword) {
      return alert("Passwords mismatch");
    }

    await registerUser({ ...formData })
      .unwrap()
      .then(({ token }) => {
        dispatch(setCredentials(token));
        clearFormData();
        toast.success("Register Success");
      });
  };

  return (
    <Page>
      <div className="flex flex-col items-center justify-between w-full p-2 sm:flex-row lg:justify-around h-[100%]">
        <div className="w-full p-2 mb-10 space-y-3 text-center sm:w-fit sm:mb-0">
          <h2 className="text-3xl font-bold text-blue-800 sm:mb-0">Register</h2>
          <h3 className="text-lg font-bold text-blue-800/80">
            Create an Account
          </h3>
        </div>

        <form
          className="p-4 py-10 space-y-2 rounded shadow ring-2 ring-offset-4 ring-blue-800 bg-blue-100/20"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="w-full p-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`inputField ${errors?.name && "ring-2 ring-red-400"}`}
              placeholder="Enter your name"
            />
            <p className="errorMessage">{errors?.name?.message}</p>
          </div>
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
          <div className="w-full p-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="text"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="inputField"
              placeholder="Confirm Password"
            />
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
