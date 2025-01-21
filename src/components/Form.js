import React, { useState } from 'react';

function ActivityForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [accessCode, setAccessCode] = useState('');

  // generare cod acces functie
  const generateAccessCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //const generatedCode = generateAccessCode(); // Generează codul de acces
    // setAccessCode(generatedCode); // Salvează codul în starea componentului

    const activityData = { name, description, date, duration}; // obiect cu datele activitatii

    try {
      const response = await fetch('http://localhost:5000/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData),
      });
      const result = await response.json();
      setAccessCode(result.accessCode); // Salvează codul de acces generat
      console.log('Activitate salvată:', result);
    } catch (error) {
      console.error('Eroare la trimiterea datelor:', error);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-800">
      <form onSubmit={handleSubmit} className="w-full h-4/6 max-w-lg p-6 mt-32 bg-gray-300 shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Nume activitate
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nume activitate"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
            Descriere
          </label>
          <textarea
            id="description"
            placeholder="Descriere"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="date">
            Data
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="duration">
            Durata (minute)
          </label>
          <input
            id="duration"
            type="number"
            placeholder="Durata (minute)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* afisare cod generat */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="accessCode">
            Cod acces
          </label>
          <input
            id="accessCode"
            type="text"
            value={accessCode} 
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Salvează activitatea
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActivityForm;
