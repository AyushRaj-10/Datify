import React, { useState, useEffect } from "react";
import axios from "axios";

const SwipeCard = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInsta, setShowInsta] = useState(null);
  const [stopShowingCards, setStopShowingCards] = useState(false);
  const [matchMessage, setMatchMessage] = useState(null);
  const [chatbotVisible, setChatbotVisible] = useState(false); // State to manage chatbot visibility
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => setUsers(response.data.reverse()))
      .catch((error) => {
        console.error("Error fetching users", error);
        setUsers([]); // Optional: set empty users array if error occurs
      });
  }, []);

  const acceptUser = (user) => {
    setShowInsta(user.insta); // Show Instagram if accepted
    setStopShowingCards(true); // Stop showing more cards
    setMatchMessage(`Congratulations! You've found a match with ${user.name}. 🎉`);
  };

  const rejectUser = () => {
    // If we reach the end of the cards, show the chatbot
    if (currentIndex + 1 >= users.length) {
      setChatbotVisible(true);
      setStopShowingCards(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Go to next user when rejected
    }
  };

  const sendChatMessage = (message) => {
    setChatMessages([...chatMessages, { from: "user", message }]);
    setTimeout(() => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { from: "chatbot", message: "Sorry! Your virtual partner also rejects you." },
      ]);
    }, 1000); // Simulate chatbot response after 1 second
  };

  if (users.length === 0) {
    return <p>Loading users...</p>;
  }

  if (currentIndex >= users.length || stopShowingCards) {
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

  const currentUser = users[currentIndex];

  return (
    <div className="bg-gradient-to-r from-pink-400 to-orange-500 min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 fixed w-full top-0 left-0 z-50">
        <div className="flex justify-evenly items-center">
          <a href="/home" className="text-2xl font-bold text-pink-500 hover:text-pink-700">Home</a>
          <div className="space-x-6">
            <a href="/card" className="text-lg text-gray-700 hover:text-pink-600">About</a>
            <a href="/contactus" className="text-lg text-gray-700 hover:text-pink-600">Contact Us</a>
            <a href="/confess" className="text-lg text-gray-700 hover:text-pink-600">Confessions</a>
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
