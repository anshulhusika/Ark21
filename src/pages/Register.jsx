import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      setSuccess("Account created successfully! Please login.");

      setName("");
      setEmail("");
      setPassword("");
      setRole("buyer");

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="login-wrapper">

      <div className="login-left">

        <div className="w-full max-w-md">

          <h2 className="text-2xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-6">
            Join Ark 21 as Buyer or Seller
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="mb-4">
              <label className="block mb-1">Register As</label>

              <select
                className="input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            <button className="btn-primary w-full">
              Register
            </button>

          </form>

          <p className="mt-6 text-center">
            Already have account?
            <a href="/login" className="text-blue-700 font-bold ml-2">
              Login
            </a>
          </p>

        </div>

      </div>

      <div className="login-right hidden md:flex">
        <img
          className="login-image"
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
          alt="Register"
        />
      </div>

    </div>
  );
};

export default Register;
