const fs = require('fs');
////////// DATA //////////
const rulesData = JSON.parse(fs.readFileSync(`${__dirname}/../data/rules-data.json`), {encoding:'utf8'}) || {};

exports.checkIndex = (request, response, next, val) => {
  const { index } = request.params;
  const rule = rulesData.find((el) => el.index === index);
  if ( !rule ) {
    return response.status(404)
      .json({
        status: 'fail',
        message: 'Invalid Rules index'
      })
  }
  next()
}

exports.getAllRules = (request, response) => {
  return response.status(200)
    .json({
      status: 'success',
      count: rulesData.length,
      results: rulesData
    })
}

exports.getRuleByIndex = (request, response) => {
  const { index } = request.params;
  const rule = rulesData.find(el => el.index === index)
  return response.status(200)
    .json({
      status: 'success',
      results: rule
    })
}
