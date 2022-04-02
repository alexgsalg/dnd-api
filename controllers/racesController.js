const fs = require('fs');
////////// DATA //////////
const racesData = JSON.parse(fs.readFileSync(`${__dirname}/../data/races-data.json`), {encoding:'utf8'}) || {};

exports.checkIndex = (request, response, next, val) => {
  const { index } = request.params;
  const race = racesData.find((el) => el.index === index);
  if ( !race ) {
    return response.status(404)
      .json({
        status: 'fail',
        message: 'Invalid race index'
      })
  }
  next()
}

exports.getAllRaces = (request, response) => {
  return response.status(200)
    .json({
      status: 'success',
      count: racesData.length,
      results: racesData
    })
}

exports.getRaceByIndex = (request, response) => {
  const { index } = request.params;
  const race = racesData.find(el => el.index === index)
  return response.status(200)
    .json({
      status: 'success',
      results: race
    })
}
