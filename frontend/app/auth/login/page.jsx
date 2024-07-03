"use client";
import BASE_URL from "@/constants/constants";
import dispatch from "@/store/dispatch";
import { login } from "@/store/slice/userSlice";
import axios from "axios";
import { useState } from "react";
const LoginPage = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  // dispatch(login())
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
      setError("Username and password are required");
      return;
    }
    try {
      const resposne = await axios.post(`${BASE_URL}/users/login`, user);
      console.log(resposne.data.data);
      if (resposne.data.status === 200) {
        dispatch(login(resposne.data.data));
        window.location.href = "/";
      } else if (resposne.data.status === 401) {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
      <div className="bg-white lg:p-8 p-4 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login / ApnaBazar
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="username"
              name="username"
              onChange={handleChange}
              value={user.username}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Enter your password"
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
