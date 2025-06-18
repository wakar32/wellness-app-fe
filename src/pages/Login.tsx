import React from "react";
import AuthForm from "../components/AuthForm";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login: doLogin } = useAuth();

  const handleLogin = async (data: any) => {
    const result = await login(data);
    if (result.token) {
      doLogin(result.token);
      navigate("/");
    }
  };

  return <AuthForm onSubmit={handleLogin} />;
};

export default Login;
