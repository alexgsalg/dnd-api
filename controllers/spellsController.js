const fs = require('fs');
////////// DATA //////////
const spellsData = JSON.parse(fs.readFileSync(`${__dirname}/../data/spells-data.json`), {encoding:'utf8'}) || {};
const classList = ["barbarian","bard","cleric","druid","fighter","monk","paladin","ranger","rogue","sorcerer","warlock", "wizard"];


exports.checkIndex = (request, response, next, val) => {
  const { index } = request.params;
  
  const spell = spellsData.find((el) => 
    el.index === index
  );

  if ( !classList.includes(index) && !spell  ) {
    return response.status(404)
      .json({
        status: 'fail',
        message: 'Invalid Spell index'
      })
  }
  
  next();
}

exports.getAllSpells = (request, response) => {
  return response.status(200)
    .json({
      status: 'success',
      count: spellsData.length,
      results: spellsData
    })
}

exports.getSpellByIndex = (request, response) => {
  const { index } = request.params;
  const spell = spellsData.find(el => el.index === index)
  return response.status(200)
    .json({
      status: 'success',
      results: spell
    })
}

exports.getSpellsByClass = (request, response) => {
  const { index, name } = request.params;

  const classSpells  = spellsData.filter(spells => spells.classes.some(el => el.index === index));
  return response.status(200)
    .json({
      status: 'success',
      class: name, 
      count: classSpells.length,
      results: classSpells
    })
}
