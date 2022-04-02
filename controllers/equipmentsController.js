const fs = require('fs');
////////// DATA //////////
const equipmentsData = JSON.parse(fs.readFileSync(`${__dirname}/../data/equipments-data.json`), {encoding:'utf8'}) || {};

exports.checkIndex = (request, response, next, val) => {
  const { index } = request.params;
  const equipment = equipmentsData.find((el) => el.index === index);
  if ( !equipment ) {
    return response.status(404)
      .json({
        status: 'fail',
        message: 'Invalid Equipment index'
      })
  }
  next()
}

exports.getAllEquipments = (request, response) => {
  return response.status(200)
    .json({
      status: 'success',
      count: equipmentsData.length,
      results: equipmentsData
    })
}

exports.getEquipmentByIndex = (request, response) => {
  const { index } = request.params;
  const equipment = equipmentsData.find(el => el.index === index)
  return response.status(200)
    .json({
      status: 'success',
      results: equipment
    })
}
