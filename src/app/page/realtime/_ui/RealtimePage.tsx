"use client";
import { Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { urlB64ToUint8Array } from "../_lib/urlB64ToUint8Array";
import { apies } from "@/lib/routes";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

let app: FirebaseApp | null = null;
async function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyA3e2i9xshF06SVzDPv3clvE1jBwFgqvkI",
    authDomain: "wibu-5281e.firebaseapp.com",
    databaseURL:
      "https://wibu-5281e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wibu-5281e",
    storageBucket: "wibu-5281e.appspot.com",
    messagingSenderId: "756250490701",
    appId: "1:756250490701:web:b3d25786a683d98503e904",
    measurementId: "G-1363RGK1FE"
  };

  if (!app) {
    app = initializeApp(firebaseConfig);
    getMessaging(app);
  }
}

export function RealtimePage({ publicKey }: { publicKey: string }) {
  useShallowEffect(() => {}, []);
  return (
    <Stack>
      {publicKey}
      realtime page
    </Stack>
  );
}
