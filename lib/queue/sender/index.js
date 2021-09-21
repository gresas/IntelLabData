var amqp = require('amqplib');

const sendToQueue = (msg) => amqp.connect('amqp://localhost').then(function(conn) {
    return conn.createChannel().then(function(ch) {
      const queue = process.env.QUEUE_NAME;
  
      var ok = ch.assertQueue(queue, {durable: false});
  
      return ok.then(async function(_qok) {

        await ch.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent '%s'", msg);
        return ch.close();
      });
    }).finally(function() { conn.close(); });
  }).catch(console.warn);

module.exports = {
  sendToQueue
};