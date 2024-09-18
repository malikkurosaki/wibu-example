"use client";
import { apies } from "@/lib/routes";
import { Button, Group, Stack, Tabs, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import mqtt from "mqtt";
import { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");
  useShallowEffect(() => {
    const mqttClient = mqtt.connect("wss://io.wibudev.com");

    // Set client di state
    setClient(mqttClient);


    // Menerima pesan dari broker
    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe("wibu");
    });

    mqttClient.on("message", (topic, payload) => {
      console.log(`Message received from ${topic}: ${payload}`);
      setMessage(payload.toString());
    });

    // Membersihkan koneksi ketika komponen unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  async function kirim() {
    if (!pesan) return alert("isi pesan dulu");
    setLoading(true);
    const res = await fetch(apies["/page/mqtt/api/send-message"], {
      method: "POST",
      body: JSON.stringify({ message: pesan })
    });
    setPesan("");
    setLoading(false);
    if (!res.ok) return alert("gagal kirim pesan");
  }

  return (
    <Stack p={"lg"}>
      <Group>
        <Stack>
          <TextInput
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            placeholder="input pesan"
          />
          <Button loading={loading} onClick={kirim}>
            kirim
          </Button>
          <div>
            <h1>MQTT Message Received</h1>
            <p>Received message: {message}</p>
          </div>
        </Stack>
      </Group>
    </Stack>
  );
}

