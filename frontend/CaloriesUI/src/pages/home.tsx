import { AppShell } from "@/components/AppShell";
import { SearchFeature } from "@/features/Search/components/SearchFeature";

export default function Home() {
  return (
    <AppShell>
      <SearchFeature />
    </AppShell>
  );
}
