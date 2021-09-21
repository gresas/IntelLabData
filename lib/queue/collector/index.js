const { sendTelegramMessage } = require('../../generic/TelegramHelper');
const { fileStructure } = require('../../generic/FileHelper');
const { isNullOrEmpty } = require('../../generic/Utils');
const { hasAnomality } = require('../../generic/IntelLabData');
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(async function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = process.env.QUEUE_NAME;

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, async function(msg) {
          const k = msg.content.toString();

          const queueData = fileStructure(...msg.content.toString().split(' '));
          console.log(" [x] Received data from sensor %s", queueData.sensorId);
          
          // Define Anomality of data
          const message = await hasAnomality(queueData);
          
          if (!isNullOrEmpty(message)) {
            await sensorWarn(queueData, message);
          }
        }, {
            noAck: true
        });
    });
});

const sensorWarn = async (data, msg) => {
  const dateObj = new Date(data.date).toISOString();
  const dateStr = dateObj.replace(/T/, ' ').replace(/\..+/, '') 

  await sendTelegramMessage(`[${dateStr}] Sensor id = ${data.sensorId} need your attention!\nWarnMessage:\n ${msg}`);
};
