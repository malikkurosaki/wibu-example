import mqtt from "mqtt";
import { GlobalMqtt } from "../../_lib/globalMqtt";

// const brokerUrl = "wss://io.wibudev.com"; // Ganti dengan URL broker MQTT kamu
const topic = "wibu"; // Ganti dengan topik yang sesuai

// // Inisialisasi client MQTT
// const client = mqtt.connect(brokerUrl);

// client.on("connect", () => {
//   console.log("Connected to MQTT broker");
// });

// client.on("error", (error) => {
//   console.error("MQTT error:", error);
// });
export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return new Response("Message is required", { status: 400 });
  }

  // Publish message to MQTT broker
  GlobalMqtt.client!.publish(topic, message, (err) => {
    if (err) {
      return new Response(err.message, { status: 500 });
    }

    return new Response("Message sent successfully", { status: 200 });
  });

  return new Response("Message sent successfully", { status: 200 });
}
