import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { authActions, loginUser } from "../../Store/slices/auth";
import { AppDispatch, RootState } from "../../Store/store";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    dispatch(loginUser(formData));
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
      toast.success("Logged In Successfully");
      navigate("/dashboard");
    }
  }, [authState.token]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
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
        <Button isLoading={authState.isLoading} type="submit" btnText="Login" />
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/signup" replace className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
