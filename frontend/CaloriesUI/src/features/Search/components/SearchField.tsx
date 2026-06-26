import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";

interface SearchFieldProps {
  query: string;
  setQuery: (val: string) => void;
}

export function SearchField({ query, setQuery }: SearchFieldProps) {
  const { t } = useI18n();
  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="h-12 border-0 bg-transparent pl-10 text-base shadow-none focus-visible:ring-0"
      />
    </div>
  );
}
