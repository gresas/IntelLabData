const { isNullOrEmpty } = require('../generic/Utils');
const R = require('ramda');

const calculateAnomality = (threshold, avgValue) => (value) => {
  const lower = avgValue - (threshold * avgValue);
  const higher = avgValue + (threshold * avgValue);
  
  if (value > higher) {
    return ` ${value} is above the higher threshold ${higher}`;
  } else if (value < lower) {
    return ` ${value} is below the lower threshold ${lower}`;
  }

  return '';
};

const propertyAnomality = (prop) => (data) => {
  const anomalityValue = parseFloat(R.prop(prop, data));
  const propUpperCase = prop.toUpperCase();

  if (isNullOrEmpty(anomalityValue) || isNullOrEmpty(propUpperCase)) {
    return '';
  }
  
  const threshold = parseFloat(R.prop(propUpperCase + '_THRESHOLD', process.env));
  const averageValue = parseFloat(R.prop(propUpperCase + '_AVG', process.env));

  const calculatePropertyAnomality = calculateAnomality(threshold, averageValue);
  const warnMessage = calculatePropertyAnomality(anomalityValue);
  
  if (isNullOrEmpty(warnMessage)) {
    return '';
  }

  return '- ' + propUpperCase + warnMessage + '\n';
};

const hasAnomality = async (data) => {
  const properties = ['temperature', 'humidity', 'lux', 'voltage'];
  let message = '';

  for (property of properties) {
    let calculate = propertyAnomality(property);
    message += await calculate(data);
  }

  return message;
};

module.exports = {
  hasAnomality
}