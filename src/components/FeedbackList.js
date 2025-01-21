import React from 'react';
// am facut componenta separata pentru afisarea feedback-ului, pentru ca poate fi folosita si in alte locuri, dar si pentru a face codul mai usor de citit
function FeedbackList({ feedback }) { // primim prop-ul feedback
  return (
    <div>
      <h3 className="text-xl font-semibold">Feedback-ul pentru activitate:</h3>
      <ul className="mt-4">
        {feedback.map((item, index) => (
          <li key={index} className="border-b py-2">
            <p><strong>Tip feedback:</strong> {item.type}</p>
            <p><strong>Momentul feedback-ului:</strong> {new Date(item.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
