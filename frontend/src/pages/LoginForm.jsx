import React, { useState, useContext, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import apiClient from "../configs/axios";
import Loader from "../components/Loader";
import useAuthStore from "../services/useAuthStore";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchUser = useAuthStore((state) => state.fetchUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
        const response =  await apiClient.post('login', {email, password});
        await fetchUser();
        navigate('/dashboard')
        
    } catch(err) {
      console.log(err)
        
      setErrors(err.response?.data.errors || {});
    }
    
    finally {
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
          <p className="text-gray-500 text-sm mt-1">Log in to manage your projects and clients.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your Email"
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
            placeholder="Enter your secret Password"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
            }`}
            />
            {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>
            )}

          </div>

          {errors.non_field_errors && (
            <>
              <p className="text-red-600 text-sm">{errors.non_field_errors[0]}</p>
            </>
          )}

          <div className="mt-2 text-center">
                  <Link
                    to="/forgot-password"
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    Forgot password?
                  </Link>
            </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          New here?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Create an account
          </Link>
        </p>

        <p className="text-xs text-gray-400 mt-8 text-center">
          © 2025 FreelanceHub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
