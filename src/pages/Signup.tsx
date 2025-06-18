import React from "react";
import AuthForm from "../components/AuthForm";
import { signup } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login: doLogin } = useAuth();

  const handleSignup = async (data: any) => {
    const result = await signup(data);
    if (result.token) {
      doLogin(result.token);
      navigate("/");
    }
  };

  return <AuthForm onSubmit={handleSignup} isSignup />;
};

export default Signup;
