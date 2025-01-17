import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Input } from "../index";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { userLogin } from "../../apirequests/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  const { isSubmitting } = formState;

  const formSubmitHandler = async (body) => {
    try {
      setError(null);
      const userData = await userLogin(body);
      if (userData.success) {
        dispatch(login(userData.data.user));
        localStorage.setItem("token", userData?.data?.accessToken);
        localStorage.setItem("myState", JSON.stringify(userData.data.user));
        navigate("/");
      } else {
        throw userData;
      }
    } catch (error) {
      console.log("Error submitting form", error);
      setError(error);
      toast.error(error?.errmessage || "An error occurred during login.");
    }
  };

  const validationErrorHandler = (error) => {
    console.log(error);
    setError(error);
    toast.error("Please fill the form correctly.");
  };

  return (
    <div className="flex items-center justify-center w-full bg-purple-100 min-h-screen">
      {/* Toast Container */}
      <ToastContainer />
      <div
        className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg border border-purple-300`}
      >
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold text-purple-700 leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-purple-500">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit(formSubmitHandler, validationErrorHandler)} className="mt-8">
          <div className="min-h-8 mt-5">
            {error?.errmessage && <p className="text-red-600 text-center ">{error.errmessage}</p>}
          </div>

          <div className="space-y-5">
            <Input
              label="Email : "
              placeholder="Enter Your Email"
              type="Email"
              className="border-purple-300 focus:ring-purple-500"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email Required",
                },
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be valid",
                },
              })}
            />
            <div className="text-cyan-500 min-h-8">
              {error && error.email?.message}
            </div>

            <Input
              label="Password : "
              type="password"
              placeholder="Enter your password"
              className="border-purple-300 focus:ring-purple-500"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password Required",
                },
              })}
            />
            <div className="text-red-500 min-h-8">
              {error && error.password?.message}
            </div>

            <Button
              type="submit"
              className={`w-full ${isSubmitting ? "bg-purple-300" : "bg-purple-500"} text-white py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50`}
              disabled={isSubmitting}
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
