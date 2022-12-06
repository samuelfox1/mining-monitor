import findLocalDevice from 'local-devices';

import { scan as scanConfig } from '../config/config.js';

class Scan {
  constructor({ machineIps }) {
    if (!machineIps || !machineIps.length)
      throw new Error('must provide machine ip addresses');
    this.machineIps = machineIps;
  }

  async areMachinesOnline() {
    const online = await this.scanLocalNetwork();
    return {
      ok: await this.areAllMachinesOnline(online),
      date: new Date().toLocaleString(),
      online: JSON.stringify(online),
    };
  }

  async scanLocalNetwork() {
    const results = await Promise.all(
      this.machineIps.map((ip) => this.pingMachineAt(ip))
    );
    const online = results.filter((result) => !!result);
    return online;
  }

  async pingMachineAt(ip) {
    return await findLocalDevice(ip);
  }

  async areAllMachinesOnline(online) {
    return online.length === this.machineIps.length;
  }
}
export default new Scan(scanConfig);
