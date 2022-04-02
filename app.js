const helmet = require('helmet');
const express = require('express');
const app = express();

app.use(helmet());
app.use(express.json());


////////////////// MIDDLEWARE //////////////////
const spellsRouter = require('./routes/spellsRoute');
const monstersRouter = require('./routes/monstersRoute');
const classesRouter = require('./routes/classesRoute');
const racesRouter = require('./routes/racesRoute');
const alignmentsRouter = require('./routes/alignmentsRoute');
const equipmentsRouter = require('./routes/equipmentsRoute');
const conditionsRouter = require('./routes/conditionsRoute');
const rulesRouter = require('./routes/rulesRoute');

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET');
    // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200),json();
  }
  next();
})

////////////////// ROUTES //////////////////
app.route('/').get( (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
});

app.use('/api/v1/spells', spellsRouter);
app.use('/api/v1/monsters', monstersRouter);
app.use('/api/v1/classes', classesRouter);
app.use('/api/v1/races', racesRouter);
app.use('/api/v1/alignments', alignmentsRouter);
app.use('/api/v1/equipments', equipmentsRouter);
app.use('/api/v1/conditions', conditionsRouter);
app.use('/api/v1/rules', rulesRouter);

////////////////// SERVER LISTEN //////////////////
module.exports = app;
