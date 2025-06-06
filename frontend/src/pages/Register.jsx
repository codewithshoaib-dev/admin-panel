import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../configs/axios";
import Loader from "../components/Loader";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await apiClient.post(`register`, {
        username,
        email,
        password,
      });

      if (response.data.status === 'success') {
        
      } 
    } catch (err) {
      if (err.response?.data.errors) {
        console.error(err.response.data.errors)
        setErrors(err.response.data.errors);
      } else {
        setErrors({ non_field_errors: ["Something went wrong. Please try again."] });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center bg-indigo-600 text-white rounded-full text-2xl">
            ✨
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">FreelanceHub</h1>
          <p className="text-gray-500 text-sm mt-1">Create your account to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.username ? "border-red-500" : "border-gray-300"
            }`}
            />
            {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username[0]}</p>
            )}
          </div>

          <div>
            <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
            }`}
            />
            {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
            )}

          </div>

          <div>
            <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
            }`}
            />
            {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>
            )}

          </div>

          {errors.non_field_errors && (
            <p className="text-red-600 text-sm">{errors.non_field_errors[0]}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Log in
          </Link>
        </p>

        <p className="text-xs text-gray-400 mt-8 text-center">
          © 2025 FreelanceHub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
