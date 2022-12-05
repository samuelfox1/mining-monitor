import dotenv from "dotenv";
import { Vonage } from "@vonage/server-sdk";

dotenv.config();

const vonage = new Vonage(
  {
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
    // applicationId: process.env.VONAGE_APPLICATION_ID,
    // privateKey: process.env.VONAGE_PRIVATE_KEY_PATH,
  },
  { debug: true }
);

const params = {
  from: process.env.VONAGE_VIRTUAL_NUMBER,
  to: process.env.VONAGE_TO_NUMBER,
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
