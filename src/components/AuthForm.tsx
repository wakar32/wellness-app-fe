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
    <section
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#508bfc", height: "100vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="card d-flex justify-content-center"
        style={{ width: "30rem", height: "30rem", padding: "0 2rem" }}
      >
        <h2 className="fw-bold mb-5">
          {" "}
          {isSignup ? "Sign up now" : "Sign In"}{" "}
        </h2>
        <div className="form-group">
          <label htmlFor="InputEmail">Email address</label>
          <input
            className="form-control"
            id="InputEmail"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <div className="invalid-feedback d-block">{errors.email}</div>
        </div>

        <div className="form-group">
          <label htmlFor="InputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="InputPassword"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <div className="invalid-feedback d-block">{errors.password}</div>
        </div>
        {isSignup && (
          <div className="form-group">
            <label htmlFor="ConfirmInputPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="ConfirmInputPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Password"
            />
            <div className="invalid-feedback d-block">
              {errors.confirmPassword}
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          {isSignup ? "Sign Up" : "Login"}
        </button>
        {!isSignup ? (
          <p className="text-center">
            Not a member? <a href="/signup">Register</a>
          </p>
        ) : (
          <p className="text-center">
            Already have an account? <a href="/login">Login</a>
          </p>
        )}
      </form>
    </section>
  );
};

export default AuthForm;
