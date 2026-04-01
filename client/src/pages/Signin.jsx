import React, { useState } from "react";
import API from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    user_email: "",
    user_password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user_email || !form.user_password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/signin", form);

      setUser(res.data.user);

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center pb-20">
      <form
        onSubmit={handleSubmit}
        className="mt-16 p-4 flex flex-col gap-6 ring-fuchsia-600 shadow-lg shadow-fuchsia-600/50"
      >
        <h2 className="text-xl font-bold text-center">Signup</h2>
        <div className="flex gap-x-6 items-center">
          <label className="text-2xl">Email:</label>
          <input
            className="p-2"
            type="email"
            name="user_email"
            value={form.user_email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-x-6">
          <label className="text-2xl">Password:</label>
          <input
            className="p-2"
            type="password"
            name="user_password"
            value={form.user_password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <div className="bg-blue-600 p-2 rounded text-center">
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "signin"}
          </button>
        </div>
        <div className="text-center">
          <span className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-400">
              Signup
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signin;
