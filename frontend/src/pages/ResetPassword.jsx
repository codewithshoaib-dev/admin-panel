import { useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../configs/axios";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiClient.post(`password-reset-confirm/${uid}/${token}/`, { password });
    setMessage(res.data.message || res.data.error);
  };

  return (
    <div className="max-w-sm mx-auto p-6 rounded-xl mt-8 shadow-md">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="border rounded w-full p-2 mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Set New Password
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
