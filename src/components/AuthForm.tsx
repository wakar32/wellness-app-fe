import React, { useState } from "react";
import { LoginData, SignupData } from "../types";

type Props = {
  onSubmit: (data: any) => void;
  isSignup?: boolean;
};

const AuthForm: React.FC<Props> = ({ onSubmit, isSignup = false }) => {
  const [form, setForm] = useState<SignupData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: any = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (form.password.length < 8) errs.password = "Min 8 characters";
    if (isSignup && form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <div>{errors.email}</div>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <div>{errors.password}</div>
      {isSignup && (
        <>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <div>{errors.confirmPassword}</div>
        </>
      )}
      <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
    </form>
  );
};

export default AuthForm;
