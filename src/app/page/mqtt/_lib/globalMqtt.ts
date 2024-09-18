import mqtt from "mqtt";


// init di layout.tsx
export class GlobalMqtt {
  static client: mqtt.MqttClient | null = null;

  static setClient(client: mqtt.MqttClient) {
    this.client = client;
  }
}
