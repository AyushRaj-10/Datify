import React, { useState, useEffect } from "react";
import axios from "axios";

const SwipeCard = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInsta, setShowInsta] = useState(null);
  const [stopShowingCards, setStopShowingCards] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => setUsers(response.data.reverse())) // Show the newest card first
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  const acceptUser = (user) => {
    setShowInsta(user.insta); // Show Instagram if accepted
    setStopShowingCards(true); // Stop showing more cards
  };

  const rejectUser = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1); // Go to next user when rejected
  };

  if (users.length === 0) {
    return <p>Loading users...</p>;
  }

  if (currentIndex >= users.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">All the matches are finished!</h1>
        <p className="text-lg text-gray-600">
          You have swiped through all the available profiles. Better luck next time!
        </p>
      </div>
    );
  }

  const currentUser = users[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Swipe Your Match</h1>
      <div className="relative w-full max-w-md">
        {/* Display the current user card */}
        <div className="card bg-white shadow-lg rounded-xl p-4 w-full h-96 flex flex-col justify-between">
          <img
            src={`http://localhost:3001/uploads/${currentUser.photo}`}
            alt={currentUser.name}
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg font-bold">
            {currentUser.name}, {currentUser.age}
          </h2>
          <p className="text-gray-700">{currentUser.bio}</p>
        </div>

        {/* Accept/Reject buttons */}
        <div className="flex justify-between mt-4 w-full px-6">
          <button
            onClick={() => rejectUser()}
            className="bg-red-500 text-white py-2 px-4 rounded-lg w-1/3"
          >
            Reject
          </button>
          <button
            onClick={() => acceptUser(currentUser)}
            className="bg-green-500 text-white py-2 px-4 rounded-lg w-1/3"
          >
            Accept
          </button>
        </div>
      </div>

      {/* Display Instagram if accepted */}
      {showInsta && stopShowingCards && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <p>
            Instagram:{" "}
            <a
              href={`https://instagram.com/${showInsta}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline"
            >
              @{showInsta}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default SwipeCard;
