import { useI18n } from "@/lib/i18n";
import { type Comida } from "@/lib/foods";
import { SearchResultCard } from "./SearchResultCard";

interface SearchResultsProps {
  query: string;
  results: Comida[];
}

export function SearchResults({ query, results }: SearchResultsProps) {
  const { t } = useI18n();

  if (!query.trim()) return null;

  return (
    <div className="mt-2 max-h-72 overflow-y-auto rounded-xl bg-background/60 p-1">
      {results.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-muted-foreground">{t("noResults")}</p>
      ) : (
        <ul className="space-y-1.5 p-1">
          {results.map((c) => (
            <SearchResultCard key={c.id} c={c} />
          ))}
        </ul>
      )}
    </div>
  );
}
