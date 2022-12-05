import dotenv from 'dotenv';

dotenv.config();

const {
  env: { API_KEY, API_SECRET, VIRTUAL_NUMBER, TO_NUMBER, MACHINE_IPS },
} = process;

export const interval = 30 * 60000;

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

export const monitor = {
  machineIps: JSON.parse(MACHINE_IPS),
};
