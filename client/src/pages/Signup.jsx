import React, { useState } from "react";
import API from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_age: "",
    user_gender: "male",
    user_address: "",
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
    if (
      !form.user_name ||
      !form.user_email ||
      !form.user_password ||
      !form.user_age ||
      !form.user_gender ||
      !form.user_address
    ) {
      return alert("Please fill required fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/signup", form);

      alert(res.data.message || "Signup successful");

      // optional: auto login
      // setUser(res.data.user);

      navigate("/signin");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center pb-20">
      <form
        onSubmit={handleSubmit}
        className="w-[300px] md:w-[400px] bg-black mt-16 p-4 flex flex-col gap-3 md:gap-5 ring-fuchsia-600 shadow-lg shadow-fuchsia-600/50"
      >
        <h2 className="text-xl font-bold text-center">Signup</h2>
        <div className="flex gap-x-5 items-center">
          <label>Name:</label>
          <input
            className="p-1 md:p-2 w-full"
            type="text"
            name="user_name"
            value={form.user_name}
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-x-5 items-center">
          <label>Email:</label>
          <input
            className="p-1 md:p-2 w-full"
            type="email"
            name="user_email"
            value={form.user_email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-x-5 items-center">
          <label>Password:</label>
          <input
            className="p-1 md:p-2 w-full"
            type="password"
            name="user_password"
            value={form.user_password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-x-5 items-center">
          <label>Age:</label>
          <input
            className="p-1 md:p-2 w-full"
            type="number"
            name="user_age"
            value={form.user_age}
            placeholder="Age"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-x-5 items-center">
          <select
            name="user_gender"
            value={form.user_gender}
            onChange={handleChange}
            className="bg-black w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex gap-x-5 items-center">
          <label>Address:</label>
          <input
            className="p-1 md:p-2 w-full"
            type="text"
            name="user_address"
            value={form.user_address}
            placeholder="Address"
            onChange={handleChange}
          />
        </div>
        <div className="bg-blue-600 text-white p-2 text-center rounded hover:bg-blue-700">
          <button type="submit" disabled={loading}>
            {loading ? "signing up..." : "signup"}
          </button>
        </div>
        <div className="text-center">
          <span className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:text-blue-400">
              Signin
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
