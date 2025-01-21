import React, { useState } from 'react';
import FeedbackList from './FeedbackList';  // afisare feedback, componenta separata

function ProfFeedback() {
  const [activityId, setActivityId] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState('');

  // functie pt submit la formular
  const handleSubmit = async (event) => {
    event.preventDefault();

    // daca schimbam id-ul la activitate, stergem feedback-ul vechi
    setFeedback(null);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${activityId}`);
      const result = await response.json();

      if (response.ok) {
        setFeedback(result);
      } else {
        setError(result.error || 'Nu există feedback pentru această activitate.');
      }
    } catch (err) {
      setError('Eroare la server.'); // daca e 404 Not Found sau altceva
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Vizualizează Feedback-ul Activității</h2>
      <form onSubmit={handleSubmit} className="my-4">
        <label htmlFor="activityId" className="block text-lg mb-2">
          ID Activitate:
        </label>
        <input
          type="text"
          id="activityId"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          placeholder="Introdu ID-ul activității"
          className="p-2 border rounded w-50"
        />
        <button type="submit" className="mt-2 ml-5 p-2 bg-blue-500 text-white rounded">
          Vezi feedback
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {feedback && (
        <div className="mt-4">
          <FeedbackList feedback={feedback} />
        </div>
      )}
    </div>
  );
}

export default ProfFeedback;
