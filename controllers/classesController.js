const fs = require('fs');
////////// DATA //////////
const classesData = JSON.parse(fs.readFileSync(`${__dirname}/../data/classes-data.json`), {encoding:'utf8'}) || {};
const spellsData = JSON.parse(fs.readFileSync(`${__dirname}/../data/spells-data.json`), {encoding:'utf8'}) || {};

exports.checkIndex = (request, response, next, val) => {
  const { index } = request.params;
  const classes = classesData.find((el) => el.index === index);
  if ( !classes ) {
    return response.status(404)
      .json({
        status: 'fail',
        message: 'Invalid Class index'
      })
  }
  next()
}

exports.getAllClasses = (request, response) => {
  return response.status(200)
    .json({
      status: 'success',
      count: classesData.length,
      results: classesData
    })
}
  
exports.getClassByIndex = (request, response) => {
  const { index } = request.params;
  const classSelected = classesData.find(el => el.index === index)
  return response.status(200)
    .json({
      status: 'success',
      results: classSelected
    })
}

exports.getSpellsByClass = (request, response) => {
  const { index, name } = request.params;

  const classSpells  = spellsData.filter(spells => spells.classes.some(el => el.index === index));
  classSpells.map(el => delete el.classes);
  return response.status(200)
    .json({
      status: 'success',
      class: name, 
      count: classSpells.length,
      results: classSpells
    })
}
