// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import type { Metadata, Viewport } from "next";
import { ScrollProvider } from "@/lib/ui/ScrollProvider";
import { GlobalMqtt } from "./page/mqtt/_lib/globalMqtt";
import mqtt from "mqtt";

const APP_NAME = "WIBU EXAMPLE";
const APP_DEFAULT_TITLE = "wibu example";
const APP_TITLE_TEMPLATE = "%s - wibu";
const APP_DESCRIPTION = "kumpulan example";

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

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <ScrollProvider>{children}</ScrollProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
