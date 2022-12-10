import { Vonage } from '@vonage/server-sdk';

import { alert as alertConfig, time as timeConfig } from '../config/config.js';

class Alert {
  constructor({ buildArgs, sendArgs, options }, timeConfig) {
    this.service = new Vonage(buildArgs, options);
    this.sendArgs = sendArgs;
    this.offlineAt = null;
    this.offlineThreshold = timeConfig.offlineThreshold;
    this.remindThreshold = timeConfig.remindThreshold;
    this.hasAlertSent = false;
    this.lastReminderAt = null;
    this.reminderInterval = null;
  }

  setOfflineAt(offLineAt) {
    this.offlineAt = offLineAt;
  }

  setHasAlertSent(hasAlertSent) {
    this.hasAlertSent = hasAlertSent;
  }

  setLastReminderAt(lastReminderAt) {
    this.lastReminderAt = lastReminderAt;
  }

  async reportMachinesOnline() {
    if (this.offlineAt) {
      await this.resolveAlert();
    }
  }

  async resolveAlert() {
    if (this.hasAlertSent) {
      const date = new Date().toLocaleString();
      const message = `[ resolved ] machines online  at: ${date}`;
      await this.sendSMS(message);
    }

    this.resetAlertState();
  }

  async resetAlertState() {
    this.setOfflineAt(null);
    this.setHasAlertSent(false);
    clearInterval(this.reminderInterval);
    this.setLastReminderAt(null);
  }

  async reportMachinesOffline() {
    const now = new Date();
    if (!this.offlineAt) {
      this.setOfflineAt(now);
      return;
    }
    const durationOffline = this.calculateDurationOfflineTill(now);
    if (!this.hasAlertSent && durationOffline > this.offlineThreshold) {
      await this.triggerAlert();
    }
  }

  calculateDurationOfflineTill(now) {
    return now.getTime() - this.offlineAt.getTime();
  }

  async sendReminder(now) {
    if (this.offlineAt) {
      const message = `[ reminder ] machines offline since: ${this.offlineAt.toLocaleString()}`;
      this.setLastReminderAt(now);
      await this.sendSMS(message);
    }
  }

  async triggerAlert() {
    const message = `[ trigger  ] machines offline at: ${this.offlineAt.toLocaleString()}`;
    await this.sendSMS(message);
    this.setHasAlertSent(true);
    this.triggerReminderLoop();
  }

  triggerReminderLoop() {
    this.reminderInterval = setInterval(() => {
      const now = new Date();
      this.sendReminder(now);
    }, this.remindThreshold);
  }

  async sendSMS(text) {
    console.log(text);
    const args = { ...this.sendArgs, text };
    const response = await this.service.sms.send(args);
    console.log(JSON.stringify(response));
  }
}

export default new Alert(alertConfig, timeConfig);
