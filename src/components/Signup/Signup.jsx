import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Button, Input } from "../index";
import { useForm } from "react-hook-form";
import { userSignup } from "../../apirequests/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;
  const formSubmitHandler = async (data) => {
    setError(null);
    try {
      const response = await userSignup(data);
      console.log(response);
      if (response.success) {
        navigate("/login");
      } else {
        throw response;
      }
    } catch (error) {
      console.log("Error submitting form to create user,", error.message);
      setError(error);
      toast.error(error?.errmessage || "An error occurred during signup.");
    }
  };

  const validationErrorHandler = (error) => {
    console.log(error);
    setError(error);
    toast.error("Please fill the details correctly.");
  };

  return (
    <div className="flex items-center justify-center bg-purple-100 min-h-screen">
      {/* Toast Container */}
      <ToastContainer />
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg border border-purple-300">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-purple-700 leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-purple-500">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-purple-600 hover:underline">
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit(formSubmitHandler, validationErrorHandler)} noValidate>
          <div className="space-y-5">
            <div className="min-h-8 mt-5">
              {error?.errmessage && <p className="text-red-600 text-center">{error.errmessage}</p>}
            </div>

            <Input
              label="Full Name :"
              placeholder="Enter full name"
              className="border-purple-300 focus:ring-purple-500"
              {...register("name", {
                required: {
                  value: true,
                  message: "Full Name cannot be empty",
                },
                minLength: {
                  value: 3,
                  message: "Full Name must be at least 3 characters",
                },
                validate: {
                  noLeadingTrailingWhitespace: (value) =>
                    value.trim().length === value.length || "Full Name cannot have leading or trailing spaces",
                },
              })}
            />
            <div className="text-red-500 min-h-8">{error && error.name?.message}</div>

            <Input
              label="Email : "
              type="email"
              placeholder="Enter your email"
              className="border-purple-300 focus:ring-purple-500"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email cannot be empty",
                },
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be valid",
                },
              })}
            />
            <div className="text-red-500 min-h-8">{error && error.email?.message}</div>

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              className="border-purple-300 focus:ring-purple-500"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password cannot be empty",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: {
                  noWhiteSpace: (value) => !/\s/.test(value) || "Password cannot contain white spaces",
                },
              })}
            />
            <div className="text-red-500 min-h-8">{error && error.password?.message}</div>

            <Button
              type="submit"
              className={`w-full ${isSubmitting ? "bg-purple-300" : "bg-purple-500"} text-white py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50`}
              disabled={isSubmitting}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
