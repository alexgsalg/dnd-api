const fs = require('fs');
////////// DATA //////////
const conditionsData = JSON.parse(fs.readFileSync(`${__dirname}/../data/conditions-data.json`), {encoding:'utf8'}) || {};

exports.checkIndex = (request, response, next, val) => {
  const { index } = request.params;
  const condition = conditionsData.find((el) => el.index === index);
  if ( !condition ) {
    return response.status(404)
      .json({
        status: 'fail',
        message: 'Invalid Condition index'
      })
  }
  next()
}

exports.getAllConditions = (request, response) => {
  return response.status(200)
    .json({
      status: 'success',
      count: conditionsData.length,
      results: conditionsData
    })
}

exports.getConditionByIndex = (request, response) => {
  const { index } = request.params;
  const condition = conditionsData.find(el => el.index === index)
  return response.status(200)
    .json({
      status: 'success',
      results: condition
    })
}
