import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toast";

import { RootState } from "@/features/store";
import { Page } from "../components";
import axiosClient from "@/features/config/axiosClient";
import { login } from "@/features/store/auth/authSlice";
import { AxiosError } from "axios";

const loginPageSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type FormData = yup.InferType<typeof loginPageSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [userToken, navigate]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(loginPageSchema) });

  const submitHandler = async () => {
    const formData = getValues();
    try {
      const response = await axiosClient.post("/auth/login", { ...formData });
      if (response.status === 200) {
        dispatch(login(response.data.token));
        toast.success("Login Success");
        reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An Error Occured");
      }
    }
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
