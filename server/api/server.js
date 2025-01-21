const express = require('express');
const cors = require('cors'); 
const app = express();
const bodyParser = require('body-parser');
const activitiesRoutes = require('./activities/routes');
const feedbackRoutes = require('./feedback/routes');

// mentionam ca dorim sa folosim CORS pentru a permite accesul la API prin localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // practic frontend-ul nostru
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // ce metode sunt permise
}));



// middleware pentru parsarea datelor JSON, are rol de a transforma datele primite in format JSON in obiecte JavaScript
app.use(bodyParser.json());
app.use(express.json());

// rutele pentru activitati si feedback
app.use('/api/activities', activitiesRoutes);
app.use('/api/feedback', feedbackRoutes);

// pornim serverul pe portul 5000
app.listen(5000, () => {
  console.log('Serverul rulează pe http://localhost:5000');
});
