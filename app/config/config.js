import dotenv from 'dotenv';

dotenv.config();

const {
  env: { API_KEY, API_SECRET, VIRTUAL_NUMBER, TO_NUMBER, MACHINE_IPS },
} = process;

const MINUTE = 60000;

// time in minutes
const SCAN_INTERVAL = 3;
const REMIND_THRESHOLD = 30;
const OFFLINE_THRESHOLD = 60;

export const time = {
  scanInterval: SCAN_INTERVAL * MINUTE,
  remindThreshold: REMIND_THRESHOLD * MINUTE,
  offlineThreshold: OFFLINE_THRESHOLD * MINUTE,
};

export const alert = {
  buildArgs: {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    options: { debug: true },
  },
  sendArgs: {
    to: TO_NUMBER,
    from: VIRTUAL_NUMBER,
    text: 'sjf-mining-monitor alert',
  },
};

export const scan = {
  machineIps: JSON.parse(MACHINE_IPS),
};
