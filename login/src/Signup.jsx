import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [gender, setGender] = useState("");
  const [insta, setInsta] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("gender", gender);
    formData.append("insta", insta);
    formData.append("password", password);
    formData.append("bio", bio);
    formData.append("age", age);
    formData.append("photo", photo);

    axios
      .post("http://localhost:3001/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        console.log("Success:", result.data);
        navigate("/home", { replace: true });
      })
      .catch((error) => {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-semibold text-pink-500">Create Your Account</h1>
        </header>

        <main>
          <section id="signup-section">
            <h2 className="text-3xl font-medium text-gray-700 mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="college" className="block text-sm text-gray-700">
                  College Name
                </label>
                <input
                  type="text"
                  id="college"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Enter your college name"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="insta" className="block text-sm text-gray-700">
                  Instagram ID
                </label>
                <input
                  type="text"
                  id="insta"
                  value={insta}
                  onChange={(e) => setInsta(e.target.value)}
                  placeholder="Enter your Instagram ID"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a little about yourself"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                  rows="4"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="photo" className="block text-sm text-gray-700">
                  Upload Profile Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  onChange={handleFileChange}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-purple-500"
                  accept="image/*"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-pink-500 hover:underline">
                Login here
              </Link>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Signup;
