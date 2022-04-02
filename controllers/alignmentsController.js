const fs = require('fs');
////////// DATA //////////
const alignmentsData = JSON.parse(fs.readFileSync(`${__dirname}/../data/alignments-data.json`), {encoding:'utf8'}) || {};

exports.checkIndex = (request, response, next, val) => {
  const { index } = request.params;
  const alignment = alignmentsData.find((el) => el.index === index);
  if ( !alignment ) {
    return response.status(404)
      .json({
        status: 'fail',
        message: 'Invalid Alignment index'
      })
  }
  next()
}

exports.getAllAlignments = (request, response) => {
  return response.status(200)
    .json({
      status: 'success',
      count: alignmentsData.length,
      results: alignmentsData
    })
}

exports.getAlignmentByIndex = (request, response) => {
  const { index } = request.params;
  const alignment = alignmentsData.find(el => el.index === index)
  return response.status(200)
    .json({
      status: 'success',
      results: alignment
    })
}
