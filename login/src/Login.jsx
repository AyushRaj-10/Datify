import React, { useState } from "react"; // Importing useState from React
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState(""); // Manage email state
  const [password, setPassword] = useState(""); // Manage password state
  const navigate = useNavigate(); // To navigate between routes

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Sending POST request to the backend
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log("Success:", result.data);

        // Check if the login is successful
        if (result.data === "success") {
          navigate("/home", { replace: true }); // Redirect to home page
        } else {
          console.log(result.data); // Log error message if not successful
        }
      })
      .catch((error) => {
        // Handle different types of errors
        if (error.response) {
          console.error("Response Error:", error.response.data);
        } else if (error.request) {
          console.error("Request Error:", error.request);
        } else {
          console.error("General Error:", error.message);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-pink-500">
      <div className="container w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 h-auto bg-white shadow-lg rounded-lg overflow-hidden px-6 py-8">
        {/* Design Section */}
        <div className="design hidden md:block relative">
          <div className="pill-1 rotate-45 absolute bottom-0 left-[-40px] w-16 h-48 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full"></div>
          <div className="pill-2 rotate-45 absolute top-[-80px] left-[-60px] w-56 h-112 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full border-8 border-gray-200"></div>
          <div className="pill-3 rotate-45 absolute top-[-60px] left-[120px] w-24 h-48 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full"></div>
        </div>

        {/* Login Form Section */}
        <div className="login flex flex-col justify-center items-center p-8 relative">
          <h3 className="title text-2xl font-semibold text-gray-700 mb-6">User Login</h3>
          <form className="w-full space-y-6 flex flex-col" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="text-input flex items-center bg-orange-100 rounded-xl p-3 w-full md:w-10/12 mx-auto">
              <i className="ri-user-fill text-orange-600"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ml-3 w-full bg-transparent border-none outline-none text-gray-700 text-base"
              />
            </div>

            {/* Password Input */}
            <div className="text-input flex items-center bg-orange-100 rounded-xl p-3 w-full md:w-10/12 mx-auto">
              <i className="ri-lock-fill text-orange-600"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-3 w-full bg-transparent border-none outline-none text-gray-700 text-base"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn w-full md:w-10/12 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl mt-4 mx-auto hover:bg-gradient-to-l focus:ring-4 focus:ring-pink-300 transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Create Account Link */}
          <div className="create mt-6 flex justify-center">
            <a
              href="/"
              className="text-orange-600 hover:text-pink-500 text-sm font-medium"
            >
              Create Your Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;