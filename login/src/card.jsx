import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SwipeCard = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInsta, setShowInsta] = useState(null);
  const [stopShowingCards, setStopShowingCards] = useState(false);
  const [matchMessage, setMatchMessage] = useState(null);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [genderPreference, setGenderPreference] = useState(null); // State to store gender preference
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users based on gender preference

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => {
        setUsers(response.data.reverse());
      })
      .catch((error) => {
        console.error("Error fetching users", error);
        setUsers([]); // Optional: set empty users array if error occurs
      });
  }, []);

  // Filter users based on gender preference
  useEffect(() => {
    if (genderPreference && users.length > 0) {
      // Filter users where the gender matches the preferred gender
      const filtered = users.filter((user) => user.gender === genderPreference);
      setFilteredUsers(filtered); // Set filtered users to show
    }
  }, [genderPreference, users]);

  const acceptUser = (user) => {
    setShowInsta(user.insta);
    setStopShowingCards(true);
    setMatchMessage(`Congratulations! You've found a match with ${user.name}. 🎉`);
  };

  const rejectUser = () => {
    if (currentIndex + 1 >= filteredUsers.length) {
      setChatbotVisible(true);
      setStopShowingCards(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const sendChatMessage = (message) => {
    setChatMessages([...chatMessages, { from: "user", message }]);
    setTimeout(() => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { from: "chatbot", message: "Sorry! Your virtual partner also rejects you." },
      ]);
    }, 1000);
  };

  if (!genderPreference) {
    // Ask for gender preference if not set
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-400 to-orange-500 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Select Your Gender Preference</h1>
        <div className="flex space-x-6">
          <button
            onClick={() => setGenderPreference("female")}
            className="bg-pink-500 text-white py-3 px-6 rounded-lg shadow-sm"
          >
            Female
          </button>
          <button
            onClick={() => setGenderPreference("male")}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-sm"
          >
            Male
          </button>
        </div>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return <p>No users available for the selected gender preference.</p>;
  }

  const currentUser = filteredUsers[currentIndex];

  if (currentIndex >= filteredUsers.length || stopShowingCards) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-400 to-orange-500 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">{matchMessage}</h1>
        {showInsta && (
          <div className="mt-4 p-6 bg-white text-gray-800 rounded-lg shadow-md max-w-xs">
            <p className="text-center text-lg font-semibold">Follow them on Instagram:</p>
            <a
              href={`https://instagram.com/${showInsta}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-blue-500 font-bold text-xl mt-2 underline"
            >
              @{showInsta}
            </a>
          </div>
        )}

        {/* Chatbot Section */}
        {chatbotVisible && (
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mt-8">
            <h2 className="text-xl font-semibold text-center mb-4">Chat with your virtual partner</h2>
            <div className="overflow-y-auto max-h-60 mb-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`text-sm ${msg.from === "user" ? "text-right" : "text-left"}`}
                >
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Send a message"
              className="w-full px-4 py-2 border rounded-md"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  sendChatMessage(e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-pink-400 to-orange-500 min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-purple-500 to-pink-500 w-full py-3 fixed top-0 z-50 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 space-x-8">
          <Link to="/home" className="text-white text-lg font-bold hover:text-gray-300 transition duration-300">Home</Link>
          <div className="flex space-x-8">
            <Link to="/card" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300">Card</Link>
            <Link to="/contactus" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300">Contact Us</Link>
            <Link to="/confess" className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300">Confess</Link>
          </div>
        </div>
      </nav>

      <h1 className="text-3xl font-semibold mb-6">Find Your Match</h1>
      
      <div className="relative w-full max-w-md">
        {/* User Card */}
        <div className="bg-white shadow-lg rounded-xl p-4 w-full h-96 flex flex-col justify-between hover:scale-105 transition-transform duration-300 ease-in-out">
          <img
            src={`http://localhost:3001/uploads/${currentUser.photo}`}
            alt={currentUser.name}
            className="w-full h-56 object-cover rounded-lg mb-4 shadow-sm"
          />
          <h2 className="text-xl font-semibold text-gray-800">{currentUser.name}</h2>
          <p className="text-gray-500 text-md mb-2">{currentUser.age} years old</p>
          <p className="text-gray-600 text-sm">{currentUser.bio}</p>
        </div>

        {/* Accept/Reject Buttons */}
        <div className="flex justify-between mt-6 w-full px-6">
          <button
            onClick={() => rejectUser()}
            className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300 ease-in-out w-1/3"
          >
            Reject
          </button>
          <button
            onClick={() => acceptUser(currentUser)}
            className="bg-teal-500 text-white py-3 px-6 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300 ease-in-out w-1/3"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
