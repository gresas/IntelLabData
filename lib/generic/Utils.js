const R = require('ramda');

const sortByDateTime = (a, b) =>  new Date(a.date).getTime() - new Date(b.date).getTime();

const isNullOrEmpty = (value) => R.isNil(value) || R.isEmpty(value);

module.exports = {
  sortByDateTime,
  isNullOrEmpty
};