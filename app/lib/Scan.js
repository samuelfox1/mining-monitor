import findLocalDevice from 'local-devices';

import { monitor as monitorConfig } from '../config/config.js';

class Scan {
  constructor({ machineIps }) {
    if (!machineIps || !machineIps.length)
      throw new Error('must provide machine ip addresses');

    this.machineIps = machineIps;
  }

  async machinesAreOnline() {
    const results = await this.scan();
    return {
      ok: await this.validate(results),
      results,
    };
  }

  async scan() {
    const results = await Promise.all(
      this.machineIps.map((ip) => this.ping(ip))
    );
    const filtered = results.filter((result) => !!result);
    return filtered;
  }

  async ping(ip) {
    return await findLocalDevice(ip);
  }

  async validate(results) {
    return results.length === this.machineIps.length;
  }
}
export default new Scan(monitorConfig);
