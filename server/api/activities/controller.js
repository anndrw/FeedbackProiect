// const { act } = require('react'); 
const Activity = require('./model');

async function createActivity(req, res) {
  const { name, description, date, duration } = req.body;
  const accessCode = generateAccessCode();

  try {
    const activity = await Activity.create({
      name,
      description,
      date,
      duration,
      accessCode,
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error('Eroare la crearea activității:', error);
    res.status(500).json({ error: 'Eroare la crearea activității', details: error.message });
  }
}

function generateAccessCode() {
  return Math.random().toString(36).substring(2, 10); // generare cod random
}

module.exports = { createActivity };


const joinActivity = async (req, res) => {
  const { accessCode } = req.params;

  try {
    const activity = await Activity.findOne({ where: { accessCode } });

    if (!activity) {
      return res.status(404).json({ error: 'Codul de acces nu este valid' });
    }

    // validare pentru expirare activitate
    const currentTime = new Date();
    const endTime = new Date(activity.date);
    endTime.setMinutes(endTime.getMinutes() + activity.duration);

    if (currentTime > endTime) {
      return res.status(400).json({ error: 'Activitatea a expirat' });
    }

    res.json({
      id: activity.id, // trimitem id-ul activitatii pentru a putea trimite feedback-ul, obligatoriu ca sa evitam 404 Not Found la trimiterea feedback-ului (foreign key)
      name: activity.name,
      description: activity.description,
      date: activity.date,
      duration: activity.duration,
      accessCode: activity.accessCode,
      isActive: true,
    });
  } catch (error) {
    console.error('Eroare la alăturarea activității:', error);
    res.status(500).json({ error: 'Eroare la procesarea cererii' });
  }
};


module.exports = { createActivity, joinActivity };

