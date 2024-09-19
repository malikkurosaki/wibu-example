"use client";
import { Button, Group, Stack } from "@mantine/core";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export function RealtimePage({
  supabaseKey,
  supabaseUrl
}: {
  supabaseKey: string;
  supabaseUrl: string;
}) {
  const supabase = createClient(supabaseUrl, supabaseKey);

    useEffect(() => {
      const handleInserts = (payload: any) => {
        console.log("Change received!", payload);
      };

      // Subscribe to realtime changes
      const messageSubscription = supabase
        .channel("sdm")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "sdm" },
          handleInserts
        )
        .subscribe();

      // Cleanup subscription on unmount
      return () => {
        supabase.removeChannel(messageSubscription);
      };
    }, [supabase]);

  async function onKLirim() {
    const { status, error } = await supabase.from("sdm").upsert({
      id: "123e4567-e89b-12d3-a456-426614174000",
      data: {
        name: "wibu 2"
      }
    });

    if (error) {
      console.error("Error:", JSON.stringify(error));
    } else {
      console.log("Upsert status:", status);
    }
  }

  return (
    <Stack p={"lg"}>
      <Group>
        <Stack>
          Realtime page
          <Button onClick={onKLirim}>Kirim</Button>
        </Stack>
      </Group>
    </Stack>
  );
}
