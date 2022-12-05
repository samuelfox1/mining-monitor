import { config } from "dotenv";
import { Vonage } from "@vonage/server-sdk";

config();
const {
  env: { API_KEY, API_SECRET, VIRTUAL_NUMBER, TO_NUMBER },
} = process;

class Alert {
  constructor() {
    this.service = new Vonage(
      { apiKey: API_KEY, apiSecret: API_SECRET },
      { debug: true }
    );
    this.params = {
      from: VIRTUAL_NUMBER,
      to: TO_NUMBER,
    };
    this.textDefault = "Alert from `mining-monitor`";
  }

  async sendSMS(text = this.textDefault) {
    const response = await this.service.sms.send({ ...this.params, text });
    console.log(response);
  }
}

export default new Alert();
