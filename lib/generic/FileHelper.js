const fs = require("fs");
const R = require('ramda');

const fileStructure = (data, time, epoch, sensorId, temperature, humidity, lux, voltage) => {  
  const date = new Date(Date.parse(data.concat('T') + time));
  return {
    date,
    epoch,
    sensorId,
    temperature,
    humidity,
    lux,
    voltage
  };
};

const convertToRaw = (obj) => {
  const dateObj = new Date(obj.date);

  const time = dateObj.toISOString().split('T')[1].replace(/Z/, '');
  const date = dateObj.toISOString().split('T')[0];

  return `${date} ${time} ${obj.epoch} ${obj.sensorId} ${obj.temperature} ${obj.humidity} ${obj.lux} ${obj.voltage}`;
};

const fileReader = (path) => (evaluateFn = (a, b) => a < b) => {
  const fileRawData = fs.readFileSync(path, 'utf-8');
  let fileData = [];

  fileData = R.sort(evaluateFn, R.map((curr) => fileStructure(...curr.split(' ')), fileRawData.split('\n')));

  return fileData;
};

module.exports = {
  fileReader,
  fileStructure,
  convertToRaw
};
