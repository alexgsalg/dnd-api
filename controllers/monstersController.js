const fs = require('fs');
////////// DATA //////////
const monstersData = JSON.parse(fs.readFileSync(`${__dirname}/../data/monsters-data.json`), {encoding:'utf8'}) || {};

exports.checkIndex = (request, response, next, val) => {
  const { index } = request.params;
  const monster = monstersData.find((el) => el.index === index);
  if ( !monster ) {
    return response.status(404)
      .json({
        status: 'fail',
        message: 'Invalid Monster index'
      })
  }
  next()
}

exports.getAllMonsters = (request, response) => {
  return response.status(200)
    .json({
      status: 'success',
      count: monstersData.length,
      results: monstersData
    })
}

exports.getMonsterByIndex = (request, response) => {
  const { index } = request.params;
  const monster = monstersData.find(el => el.index === index)
  return response.status(200)
    .json({
      status: 'success',
      results: monster
    })
}
