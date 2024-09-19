import mqtt from "mqtt";
import { GlobalMqtt } from "./_lib/globalMqtt";
import { MtqqPage } from "./_ui/MtqqPage";

if (!GlobalMqtt.client) {
  const brokerUrl = "wss://io.wibudev.com"; // Ganti dengan URL broker MQTT kamu
  const topic = "wibu"; // Ganti dengan topik yang sesuai

  // Inisialisasi client MQTT
  const client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("Connected to MQTT broker");
  });

  client.on("error", (error) => {
    console.error("MQTT error:", error);
  });

  GlobalMqtt.setClient(client);
}

export default function Page() {
  return <MtqqPage />;
}
