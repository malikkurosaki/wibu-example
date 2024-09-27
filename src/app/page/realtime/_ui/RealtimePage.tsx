"use client";
import { Button, Group, Stack } from "@mantine/core";
import { useWibuRealtime } from "wibu-realtime";

const secret = "padahariminggukuturutayahkekotanaikdelmanistimewakududukdimuka";

/**
 * 
 * @returns 
 */
export function RealtimePage() {
  const [data, setData] = useWibuRealtime({
    project: "hipmi",
    WIBU_REALTIME_TOKEN: secret
  });

  return (
    <Stack p={"lg"}>
      {JSON.stringify(data)}
      <Group>
        <Stack>
          Realtime page
          <Button onClick={() => setData!({ name: Math.random().toString() })}>
            Kirim
          </Button>
        </Stack>
      </Group>
    </Stack>
  );
}undefined