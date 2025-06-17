import { useState } from "react";
import apiClient from "../configs/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiClient.post("password-reset-request", { email });
    setMessage(res.data.message);
  };

  return (
    <div className="max-w-sm mx-auto p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border rounded w-full p-2 mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
