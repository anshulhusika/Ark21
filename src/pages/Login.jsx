import { useState } from "react";
import axios from "axios";
import api from '../api'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const data = res.data;

    // Save token and user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect to home
    window.location.href = "/";

  } catch (err) {
    setError(
      err.response?.data?.message || "Server not reachable"
    );
  }
};


  return (
    <div className="login-wrapper">

      {/* LEFT SIDE - LOGIN FORM */}
      <div className="login-left">

        <div className="w-full max-w-md">

          <h2 className="text-2xl font-bold mb-2">
            Login to Ark21
          </h2>

          <p className="text-gray-500 mb-6">
            Buyer & Seller Trading Platform
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between mb-4 text-sm">
              <span>
                <input type="checkbox" /> Remember me
              </span>

              <a href="#" className="text-blue-600">
                Forgot Password?
              </a>
            </div>

            <button className="btn-primary w-full">
              Login
            </button>

          </form>

          <p className="mt-6 text-center">
            Don’t have account?
            <a href="/register" className="text-blue-700 font-bold ml-2">
              Register
            </a>
          </p>

        </div>

      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="login-right hidden md:flex">

        <img
          className="login-image"
          src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg"
          alt="Trading Illustration"
        />

      </div>

    </div>
  );
};

export default Login;
