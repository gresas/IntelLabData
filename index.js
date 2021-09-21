require('dotenv').config();
const { fire } = require('./src/fire');
const  { listen } = require('./src/listen');

const args = process.argv[2];

(args === 'fire') ? fire() : (args === 'listen') ? listen() : console.log('Need to pass arguments (\'fire\'/\'listen\')');

// let t_inicial, t_final;
// const main = async () => {
//   t_inicial = Date.now();
//   console.log('Tempo incial :', t_inicial);
  
//   t_final = Date.now();
//   console.log('Tempo Final :', t_final);

//   console.log('Tempo de execucao', (t_final - t_inicial)/1000);
// };

// main();
