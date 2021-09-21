const { fileReader } = require('../../lib/generic/FileHelper');
const { sortByDateTime, isNullOrEmpty } = require('../../lib/generic/Utils');
const { sendBatch } = require('./Sender');
const R = require('ramda');

const propAverage = (prop) => (data) => data.reduce((acc, curr) => {
  const value = R.prop(prop, curr);
  if (isNullOrEmpty(value))
    return acc;
  const k = acc + parseFloat(value);
  return k;
}, 0) / data.length;

const fire = async () => {
  const read = fileReader('./data/data.txt');
  const fileData = read(sortByDateTime);
  
  /*    Averaging the data values
  const temperatureAverage = propAverage('temperature')(fileData);
  const humidityAverage = propAverage('humidity')(fileData);
  const luxAverage = propAverage('lux')(fileData);
  const voltageAverage = propAverage('voltage')(fileData);
  */

  const k = R.take(1000, fileData);
  await sendBatch(k);
  
};

module.exports = {
  fire
};
