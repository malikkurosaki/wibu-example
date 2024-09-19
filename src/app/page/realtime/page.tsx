import { Stack } from "@mantine/core";
import { RealtimePage } from "./_ui/RealtimePage";
const WIBU_VAPID_PUBLIC_KEY = process.env.WIBU_VAPID_PUBLIC_KEY!;
export default function Page() {
  return <Stack>
    <RealtimePage publicKey={WIBU_VAPID_PUBLIC_KEY} />
  </Stack>;
}
