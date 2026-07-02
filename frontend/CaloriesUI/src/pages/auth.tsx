import { AppShell } from "@/components/AppShell";
import { UserAuthFeature } from "@/features/UserAuth";

export default function AuthPage() {
  return (
    <AppShell>
      <UserAuthFeature />
    </AppShell>
  );
}
