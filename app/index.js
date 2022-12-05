import { time } from './config/config.js';
import alert from './lib/Alert.js';
import scan from './lib/Scan.js';

const run = async () => {
  const results = await scan.areMachinesOnline();
  if (results.ok) alert.reportMachinesOnline();
  else alert.reportMachinesOffline();
};

console.log(`[ starting ] mining-monitor   at: ${new Date().toLocaleString()}`);
setInterval(run, time.scanInterval);
