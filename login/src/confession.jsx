import React, { useState, useEffect } from 'react';

const App = () => {
  const [confessions, setConfessions] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false); // New state for submit button

  // Fetch confessions on component mount
  useEffect(() => {
    fetchConfessions();
  }, []);

  const fetchConfessions = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:3001/confess');
      if (!response.ok) throw new Error('Failed to fetch confessions');
      const data = await response.json();
      setConfessions(data);
    } catch (err) {
      setError('Could not load confessions. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitConfession = async () => {
    if (!message.trim()) {
      alert('Please write something before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('http://localhost:3001/api/confessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error('Failed to submit confession');

      const newConfession = await response.json();
      setConfessions([newConfession, ...confessions.slice(0, 49)]);
      setMessage('');
    } catch (err) {
      alert('Error submitting your confession. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 text-white py-10">
      <h1 className="text-4xl font-bold mb-10 shadow-md text-center">Share Your Confession</h1>

      <div className="w-4/5 max-w-lg bg-white/10 p-6 rounded-lg backdrop-blur-lg shadow-lg">
        <h2 className="text-2xl mb-6 text-center">Write your confession anonymously</h2>
        <textarea
          className="w-full h-40 p-4 rounded-lg text-gray-800 border-2 border-yellow-400 focus:ring-2 focus:ring-yellow-500 resize-none"
          placeholder="Type your confession here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={submitting}
        />
        <button
          className={`w-full mt-4 py-3 bg-yellow-500 rounded-lg transform transition ${
            submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400 hover:scale-105'
          }`}
          onClick={submitConfession}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Confession'}
        </button>
      </div>

      <h2 className="text-3xl mt-12">Recent Confessions</h2>
      <div className="w-4/5 max-w-lg flex flex-col gap-6 mt-6">
        {loading ? (
          <div className="flex justify-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-yellow-400 h-12 w-12"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : confessions.length ? (
          confessions.map((confession) => (
            <div
              key={confession._id}
              className="bg-white/10 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-transform"
            >
              <p className="text-lg text-yellow-300">{confession.message}</p>
              <span className="text-sm text-gray-400">
                {new Date(confession.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-yellow-300">No confessions yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default App;
