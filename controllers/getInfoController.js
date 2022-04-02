const fs = require('fs');
const axios = require('axios');
const dnd_base = 'https://www.dnd5eapi.co/api';
const dataDir = '../data';

////////// DATA //////////
const spellsData = JSON.parse(fs.readFileSync(`${__dirname}/${dataDir}/spells-data.json`), {encoding:'utf8'}) || {};
const monstersData = JSON.parse(fs.readFileSync(`${__dirname}/../data/monsters-data.json`), {encoding:'utf8'}) || {}
const classesData = JSON.parse(fs.readFileSync(`${__dirname}/../data/classes-data.json`), {encoding:'utf8'}) || {}
const racesData = JSON.parse(fs.readFileSync(`${__dirname}/../data/races-data.json`), {encoding:'utf8'}) || {}
const alignmentsData = JSON.parse(fs.readFileSync(`${__dirname}/../data/alignments-data.json`), {encoding:'utf8'}) || {}
const equipmentsData = JSON.parse(fs.readFileSync(`${__dirname}/../data/equipments-data.json`), {encoding:'utf8'}) || {}
const conditionsData = JSON.parse(fs.readFileSync(`${__dirname}/../data/conditions-data.json`), {encoding:'utf8'}) || {}
const rulesData = JSON.parse(fs.readFileSync(`${__dirname}/../data/rules-data.json`), {encoding:'utf8'}) || {}

exports.writeData = async ( req, res, next ) => {
  console.log(`${__dirname}/../data/spells-data.json`)
  // next()
  
  // const spells = async () => {
    // if ( !spellsData ) {
    const spells = axios(`${dnd_base}/spells`)
    .then( async response => response.data)
    .then(async resp => {
      let spellsList = [];
      await resp.results.map( async (item)  => {
        await axios(`${dnd_base}/spells/${item.index}`)
        .then((data) => spellsList.push(data.data));
      });
      resp.results = await spellsList;
      return spellsList
      // return spellsJson = resp
    })
    .then(console.log('data'))
    .catch(err => {
      console.error(err);
    });
    // };
  // }
  console.log(await spells)
  /* Write the data */
  // fs.writeFileSync( `${__dirname}/../data/spells-data.json`, JSON.stringify(await spells), (err) => { });

  const monsters = () => {
    axios(`${dnd_base}/monsters`).then(response => response.data)
    .then(async resp => {
      let monstersList = [];
      await resp.results.map( async (item)  => {
        await axios(`${dnd_base}/monsters/${item.index}`)
        .then((data) => monstersList.push(data.data));
      });
      resp.results = monstersList;
      
      /* Write the data */
      fs.writeFile( `${__dirname}/../data/monsters-data.json`, JSON.stringify(resp.results), (err) => { });
    })
    .catch(err => {
      console.error(err);
    });
  }

  const classes = () => {
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
      
      /* Write the data */
      fs.writeFile( `${__dirname}/../data/classes-data.json`, JSON.stringify(resp.results), (err) => { });
    })
    .catch(err => {
      console.error(err);
    });
  }

  // function classIndex(index) {
    //   return axios(`${dnd_base}/classes/${index}`)
    //           .then(async (res) => {
      //             if (!res.data.spells) res.data.spells = `Class don't cast spell`;
      //             return res.data
      //           });
      // }
      
      const races = () => {
        axios(`${dnd_base}/races`).then(response => response.data)
        .then(async resp => {
          let racesList = [];
          await resp.results.map( async (item)  => {
            await axios(`${dnd_base}/races/${item.index}`)
            .then((data) => racesList.push(data.data));
          });
          resp.results = racesList;
          
          /* Write the data */
          fs.writeFile( `${__dirname}/../data/races-data.json`, JSON.stringify(resp.results), (err) => { });
        })
        .catch(err => {
          console.error(err);
        });
      }

  const alignments = () => {
    axios(`${dnd_base}/alignments`).then(response => response.data)
    .then(async resp => {
      let alignmentsList = [];
      await resp.results.map( async (item)  => {
        await axios(`${dnd_base}/alignments/${item.index}`)
        .then((data) => alignmentsList.push(data.data));
      });
      resp.results = alignmentsList;
      
      /* Write the data */
      fs.writeFile( `${__dirname}/../data/alignments-data.json`, JSON.stringify(resp.results), (err) => { });
    })
    .catch(err => {
      console.error(err);
    });
  }

  const equipments = () => {
    axios(`${dnd_base}/equipment`).then(response => response.data)
    .then(async resp => {
      let equipmentsList = [];
      await resp.results.map( async (item)  => {
        await axios(`${dnd_base}/equipment/${item.index}`)
        .then((data) => equipmentsList.push(data.data));
      });
      resp.results = equipmentsList;
      
      /* Write the data */
      fs.writeFile( `${__dirname}/../data/equipments-data.json`, JSON.stringify(resp.results), (err) => { });
    })
    .catch(err => {
      console.error(err);
    });
  }

  const conditions = () => {
    axios(`${dnd_base}/conditions`).then(response => response.data)
    .then(async resp => {
      let conditionsList = [];
      await resp.results.map( async (item)  => {
        await axios(`${dnd_base}/conditions/${item.index}`)
        .then((data) => conditionsList.push(data.data));
      });
      resp.results = conditionsList;
      
      /* Write the data */
      fs.writeFile( `${__dirname}/../data/conditions-data.json`, JSON.stringify(resp.results), (err) => { });
    })
    .catch(err => {
      console.error(err);
    });
  }

  const rules = () => {
    axios(`${dnd_base}/rule-sections`).then(response => response.data)
    .then(async resp => {
      let rulesList = [];
      await resp.results.map( async (item)  => {
        await axios(`${dnd_base}/rule-sections/${item.index}`)
        .then((data) => rulesList.push(data.data));
      });
      resp.results = rulesList;
              
      /* Write the data */
      fs.writeFile( `${__dirname}/../data/rules-data.json`, JSON.stringify(resp.results), (err) => { });
    })
    .catch(err => {
      console.error(err);
    });
  }


  // spells();
  monsters();
  classes();
  races();
  alignments();
  equipments();
  conditions();
  rules();  
}