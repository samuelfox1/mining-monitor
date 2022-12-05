import { interval } from './config/config.js';
import alert from './lib/Alert.js';
import scan from './lib/Scan.js';

const run = async () => {
  const { ok, results } = await scan.machinesAreOnline();

  if (!ok) {
    alert.sendSMS('not all machines online');
    return;
  }

  console.log('success:', results);
};

console.log('running');
setTimeout(run, interval);
