import { time } from './config/config.js';
import alert from './lib/Alert.js';
import scan from './lib/Scan.js';

const run = async () => {
  const results = await scan.areMachinesOnline();
  console.log(JSON.stringify(results));
  if (results.ok) alert.reportMachinesOnline();
  else alert.reportMachinesOffline();
  return true;
};

console.log(`[ starting ] mining-monitor   at: ${new Date().toLocaleString()}`);
run() && setInterval(run, time.scanInterval);
