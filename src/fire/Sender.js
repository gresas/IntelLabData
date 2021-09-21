const R = require('ramda');
const { sortByDateTime } = require('../../lib/generic/Utils');
const { convertToRaw } = require('../../lib/generic/FileHelper');
const { sendToQueue } = require('../../lib/queue/sender');
const { delay } = require('bluebird');

const PENALTY_TIME = parseInt(process.env.PENALTY_TIME);

const send = async (dataArr) => {
  for (elem of dataArr) {
    const payload = convertToRaw(elem);
    await sendToQueue(payload);
    await delay(150);
  }
};

const sendChunkData = async (currentIndex, dataArr) => {
  const currentElement = dataArr[currentIndex];

  const lastFindObjectIndex = R.findLastIndex((curr) => sortByDateTime(curr, currentElement) > PENALTY_TIME)(dataArr) + 1;
  const finalIndex = lastFindObjectIndex > 0 ? lastFindObjectIndex : currentIndex + 1;

  await send(dataArr.slice(currentIndex, finalIndex));

  return finalIndex - currentIndex;
};

const sendBatch = async (dataArr) => {
  for (let [i, data] of dataArr.entries()) {
    if (i < dataArr.length) {
      const offset = await sendChunkData(i, dataArr);
      i += offset;
    } else return false;
  }
  return true;
};

module.exports = {
  sendBatch
};