import { Vonage } from '@vonage/server-sdk';

import { alert as alertConfig } from '../config/config.js';

class Alert {
  constructor({ buildArgs, sendArgs, options }) {
    this.service = new Vonage(buildArgs, options);
    this.sendArgs = sendArgs;
  }

  async sendSMS(text) {
    const args = { ...this.sendArgs, text };
    const response = await this.service.sms.send(args);
    console.log(response);
  }
}

export default new Alert(alertConfig);
