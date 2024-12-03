import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for handling form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set form submission state to true
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md h-16 flex items-center">
        <nav className="container mx-auto flex justify-between items-center px-6">
          <div className="logo-container">
            <Link to="/home" className="flex items-center text-teal-500 hover:text-teal-700">
              <img src="/logo.png" alt="Datify logo" className="h-6 w-6 mr-2" />
              <span className="text-xl font-semibold">Datify</span>
            </Link>
          </div>
          <ul className="flex space-x-6 text-sm md:text-base">
            <li>
              <Link to="/home" className="text-gray-700 hover:text-teal-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/card" className="text-gray-700 hover:text-teal-500">
                Your Match
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="text-teal-500 font-medium hover:text-teal-700">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center bg-gray-50 py-16">
        {isSubmitted ? (
          <div className="text-center bg-white p-10 rounded-xl shadow-xl max-w-lg">
            <h1 className="text-4xl font-semibold text-teal-600 mb-4">Thank You!</h1>
            <p className="text-lg text-gray-700 mb-4">
              We appreciate your feedback and will get back to you shortly. Our team is here to assist you.
            </p>
            <Link to="/home" className="text-teal-500 hover:underline">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-xl">
            <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Get in Touch</h1>
            <p className="text-center text-lg text-gray-600 mb-12">
              We'd love to hear from you! Please fill out the form below, and we’ll reach out as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Write your message here"
                  rows="6"
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-8 py-3 rounded-full text-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      
    </div>
  );
};

export default ContactUs;
