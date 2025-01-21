import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
        
    <div className="flex justify-center items-center h-screen bg-black">
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-center text-white">Alege rolul</h1>
      <div className="flex justify-between">
        <Link to="/form">
          <button className="px-4 py-2 bg-red-800 text-white rounded-xl hover:bg-red-600 mr-5">
            Profesor
          </button>
          
        </Link>
        <Link to="/proffeedback">
          <button className="px-4 py-2 bg-red-800 text-white rounded-xl hover:bg-red-600 mr-5">
              Profesor Feedback
            </button>
        </Link>
        <Link to="/student">
          <button className="px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-600">
            Student
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Home;
