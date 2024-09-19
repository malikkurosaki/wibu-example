import { Stack } from "@mantine/core";
import { RealtimePage } from "./_ui/RealtimePage";
import { envs } from "@/lib/envs";
const WIBU_VAPID_PUBLIC_KEY = process.env.WIBU_VAPID_PUBLIC_KEY!;

const NEXT_PUBLIC_SUPABASE_ANON_KEY = envs.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const NEXT_PUBLIC_SUPABASE_URL = envs.NEXT_PUBLIC_SUPABASE_URL!

export default function Page() {
  return <Stack>
    <RealtimePage supabaseKey={NEXT_PUBLIC_SUPABASE_ANON_KEY} supabaseUrl={NEXT_PUBLIC_SUPABASE_URL} />
  </Stack>;
}
