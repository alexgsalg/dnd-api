const helmet = require('helmet');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
// const compression = require('compression');
const app = express();
const dnd_base = 'https://www.dnd5eapi.co/api';

app.use(helmet());
// app.use(compression()); //Compress all routes
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
let port = process.env.PORT || 3333;
  
  
  // Middlewares
  let spellsJson;
  axios(`${dnd_base}/spells`).then(response => response.data)
  .then(async resp => {
    let spellsList = [];
    await resp.results.map( async (item)  => {
      await axios(`${dnd_base}/spells/${item.index}`)
      .then((data) => spellsList.push(data.data));
    });
    resp.results = spellsList;
    return spellsJson = resp
  })
  .catch(err => {
    console.error(err);
  });
  
  let monstersJson;
  axios(`${dnd_base}/monsters`).then(response => response.data)
  .then(async resp => {
    let monstersList = [];
    await resp.results.map( async (item)  => {
      await axios(`${dnd_base}/monsters/${item.index}`)
      .then((data) => monstersList.push(data.data));
    });
    resp.results = monstersList;
    return monstersJson = resp
  })
  .catch(err => {
    console.error(err);
  });
  
  let classesJson;
  axios(`${dnd_base}/classes`).then(response => response.data)
  .then(async resp => {
    let classesList = [];
    await resp.results.map( async (item)  => {
      await axios(`${dnd_base}/classes/${item.index}`)
      .then((data) => {
        if (!data.data.spells) data.data.spells = `Class don't cast spell`;
        classesList.push(data.data)
      });
    });
    resp.results = classesList;
    return classesJson = resp
  })
  .catch(err => {
    console.error(err);
  });

  function classIndex(index) {
    return axios(`${dnd_base}/classes/${index}`)
            .then(async (res) => {
              if (!res.data.spells) res.data.spells = `Class don't cast spell`;
              return res.data
            });
  }

  let racesJson;
  axios(`${dnd_base}/races`).then(response => response.data)
  .then(async resp => {
    let racesList = [];
    await resp.results.map( async (item)  => {
      await axios(`${dnd_base}/races/${item.index}`)
      .then((data) => racesList.push(data.data));
    });
    resp.results = racesList;
    return racesJson = resp
  })
  .catch(err => {
    console.error(err);
  });

  let alignmentsJson;
  axios(`${dnd_base}/alignments`).then(response => response.data)
  .then(async resp => {
    let alignmentsList = [];
    await resp.results.map( async (item)  => {
      await axios(`${dnd_base}/alignments/${item.index}`)
      .then((data) => alignmentsList.push(data.data));
    });
    resp.results = alignmentsList;
    return alignmentsJson = resp
  })
  .catch(err => {
    console.error(err);
  });

  let equipmentsJson;
  axios(`${dnd_base}/equipment`).then(response => response.data)
  .then(async resp => {
    let equipmentsList = [];
    await resp.results.map( async (item)  => {
      await axios(`${dnd_base}/equipment/${item.index}`)
      .then((data) => equipmentsList.push(data.data));
    });
    resp.results = equipmentsList;
    return equipmentsJson = resp
  })
  .catch(err => {
    console.error(err);
  });

  let conditionsJson;
  axios(`${dnd_base}/conditions`).then(response => response.data)
  .then(async resp => {
    let conditionsList = [];
    await resp.results.map( async (item)  => {
      await axios(`${dnd_base}/conditions/${item.index}`)
      .then((data) => conditionsList.push(data.data));
    });
    resp.results = conditionsList;
    return conditionsJson = resp
  })
  .catch(err => {
    console.error(err);
  });

  let rulesJson;
  axios(`${dnd_base}/rule-sections`).then(response => response.data)
  .then(async resp => {
    let rulesList = [];
    await resp.results.map( async (item)  => {
      await axios(`${dnd_base}/rule-sections/${item.index}`)
      .then((data) => rulesList.push(data.data));
    });
    resp.results = rulesList;
    return rulesJson = resp
  })
  .catch(err => {
    console.error(err);
  });

// Routes
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

app.get('/spells', (req,res) => {
  res.json(spellsJson);
});

app.get('/monsters', (req,res) => {
  res.json(monstersJson);
});

app.get('/classes', (req,res) => {
  res.json(classesJson);
});

app.get('/classes/:index', async (req,res) => {
  const { index } = req.params;
  const classSpells = await classIndex(index);
  res.json(classSpells);
});

app.get('/classes/:index/spells', async (req,res) => {
  const { index } = req.params;
  const classSpells = await 
      axios(`${dnd_base}/classes/${index}/spells`)
        .then(response => response.data
      );
  res.json(classSpells);
});

app.get('/alignments', (req,res) => {
  res.json(alignmentsJson);
});

app.get('/races', (req,res) => {
  res.json(racesJson);
});

app.get('/equipments', (req,res) => {
  res.json(equipmentsJson);
});

app.get('/conditions', (req,res) => {
  res.json(conditionsJson);
});

app.get('/rules', (req,res) => {
  res.json(rulesJson);
});

// Index route
app.listen(port);
