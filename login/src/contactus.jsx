import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white py-8 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="logo-container">
            <Link to="/home" className="text-3xl font-semibold text-white hover:text-gray-400">
              <img src="/logo.png" alt="Datify logo" className="h-10" />
            </Link>
          </div>
          <ul className="flex space-x-8 text-lg">
            <li><Link to="/home" className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/card" className="hover:text-gray-400">Your Match</Link></li>
            <li><Link to="/contactus" className="font-medium text-indigo-400 hover:text-indigo-500">Contact</Link></li>
          </ul>
        </nav>
      </header>

      {/* Contact Form */}
      <main className="flex-1 bg-gray-50 py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl bg-white p-10 rounded-xl shadow-xl">
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Get in Touch</h1>
          <p className="text-center text-lg text-gray-600 mb-12">We'd love to hear from you! Please fill out the form below and we’ll get back to you as soon as possible.</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your message here"
                rows="6"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Datify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
