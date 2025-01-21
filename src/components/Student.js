import React, { useState } from 'react';

function JoinActivityForm() {
  const [accessCode, setAccessCode] = useState('');
  const [message, setMessage] = useState('');
  const [activityDetails, setActivityDetails] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/activities/join/${accessCode}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setActivityDetails(result); // salvam informatii despre activitate
        setMessage('Te-ai alăturat activității cu succes!');
      } else {
        setMessage(result.error || 'Codul de acces nu este valid sau activitatea a expirat.');
      }
    } catch (error) {
      console.error('Eroare la trimiterea datelor:', error);
      setMessage('Eroare de rețea sau server.');
    }
  };

  const handleFeedback = (type) => {
    console.log('Type:', type);
     console.log('Activity Details:', activityDetails);
     console.log(activityDetails.id);
    const newFeedback = {
      type,
      timestamp: new Date(),
      activityId: activityDetails.id, // asociem feedback-ul cu activitatea in baza de date prin id-ul activitatii
    };
    console.log('New Feedback:', newFeedback);
    setFeedback([...feedback, newFeedback]);
  
    fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback),
    })
    .then(response => { // validari cazuri de eroare
      if (!response.ok) {
        throw new Error('Network eroare, probabil 404 Not Found');
      }
      return response.json(); 
    })
    .then(data => console.log('Feedback trimis cu succes:', data))
    .catch(error => console.error('Eroare la trimiterea feedback-ului:', error));
  };

  return (

    <div className="flex justify-center h-screen bg-gray-800">
      <form onSubmit={handleSubmit} className="w-full h-4/6 max-w-lg p-6 mt-32 bg-gray-300 shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="accessCode">
            Cod acces activitate
          </label>
          <input
            id="accessCode"
            type="text"
            placeholder="Introduceți codul de acces"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Alătură-te activității
          </button>
        </div>

        {/* afisare mesaj dupa alaturare in functie daca contine succes sau nu*/}
        {message && (
          <div className={`mt-4 text-center ${message.includes('succes') ? 'text-green-500' : 'text-red-500'}`}> 
            {message}
          </div>
        )}

        {/* afisare detalii dupa alaturare */}
        {activityDetails && (
          <div className="mt-6 p-4 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Detalii Activitate</h3>
            <p><strong>Nume:</strong> {activityDetails.name}</p>
            <p><strong>Descriere:</strong> {activityDetails.description}</p>
            <p><strong>Data:</strong> {activityDetails.date}</p>
            <p><strong>Durata:</strong> {activityDetails.duration} minute</p>
            <p><strong>Cod acces:</strong> {activityDetails.accessCode}</p>
            <p><strong>Status:</strong> {activityDetails.isActive ? 'Activă' : 'Expirată'}</p>
          </div>
        )}

        {/* feedback butoane */}
        {activityDetails && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button onClick={() => handleFeedback('smiley')} className="text-6xl">😊</button>
            <button onClick={() => handleFeedback('frowny')} className="text-6xl">😢</button>
            <button onClick={() => handleFeedback('surprised')} className="text-6xl">😲</button>
            <button onClick={() => handleFeedback('confused')} className="text-6xl">😕</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default JoinActivityForm;
