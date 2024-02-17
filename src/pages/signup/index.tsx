import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { toast } from "react-toastify";
import { authActions, signupUser } from "../../Store/slices/auth";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password should be same.");
      return;
    }

    dispatch(signupUser(formData));
  };

  useEffect(() => {
    if (authState.error) {
      toast.error(authState.error);
      dispatch(authActions.reset());
    }
  }, [authState.error]);

  useEffect(() => {
    if (authState.token) {
      dispatch(authActions.reset());
      toast.success("User Registered Successfully");
      navigate("/dashboard");
    }
  }, [authState.token]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Sign Up </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputField
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChangeHandler={handleChange}
            labelName="Email"
          />
        </div>
        <div className="mb-4">
          <InputField
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChangeHandler={handleChange}
            labelName="Password"
          />
        </div>
        <div className="mb-4">
          <InputField
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChangeHandler={handleChange}
            labelName="Confirm Password"
          />
        </div>
        <Button
          isLoading={authState.isLoading}
          type="submit"
          btnText="Sign Up"
        />
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" replace className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
