// feedback/controller.js
const Feedback = require('./feedbackModel');
const Activity = require('../activities/model');

const createFeedback = async (req, res) => { // crearea feedback-ului
  const { type, timestamp, activityId } = req.body; // preluam datele din request

  try {
    const activity = await Activity.findByPk(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activitatea nu a fost găsită' });
    }

    const feedback = await Feedback.create({ type, timestamp, activityId});
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Eroare la crearea feedback-ului:', error);
    res.status(500).json({ error: 'Eroare la crearea feedback-ului' });
  }
};

const getFeedbackForActivity = async (req, res) => { // obtinerea feedback-ului pentru o activitate, folosit pentru a afisa feedback-ul in interfata de profesori
  const { activityId } = req.params;

  try {
    const feedback = await Feedback.findAll({
      where: { activityId },
      order: [['timestamp', 'ASC']],  // in ordine dupa timestamp
    });

    if (!feedback || feedback.length === 0) {
      return res.status(404).json({ error: 'Nu există feedback pentru această activitate' });
    }

    res.json(feedback);
  } catch (error) {
    console.error('Eroare la obținerea feedback-ului:', error);
    res.status(500).json({ error: 'Eroare la procesarea cererii' });
  }
};



module.exports = { createFeedback, getFeedbackForActivity};
