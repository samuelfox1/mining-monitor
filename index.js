import { config } from "dotenv";
import { Vonage } from "@vonage/server-sdk";

config();

const {
  env: { API_KEY, API_SECRET, VIRTUAL_NUMBER, TO_NUMBER },
} = process;

const vonage = new Vonage(
  {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
  },
  { debug: true }
);

const params = {
  from: VIRTUAL_NUMBER,
  to: TO_NUMBER,
  text: "Hello from node!",
};

async function sendSMS() {
  await vonage.sms
    .send(params)
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err.response);
    });
}

// sendSMS();
