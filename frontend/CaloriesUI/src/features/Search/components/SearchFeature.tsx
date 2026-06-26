import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { comidas } from "@/lib/foods";

import { SearchHeader } from "./SearchHeader";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { PlateSection } from "./PlateSection";

export function SearchFeature() {
  const { t } = useI18n();
  const { plate } = useStore();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return comidas.filter((c) => {
      if (categoryId !== "all" && c.categoriaId !== Number(categoryId)) return false;
      if (!q) return false;
      return c.nameEN.toLowerCase().includes(q) || c.nameES.toLowerCase().includes(q);
    });
  }, [query, categoryId]);

  const onCalculate = () => {
    if (plate.length === 0) {
      toast.error(t("selectFirst"));
      return;
    }
    const invalid = plate.find((p) => !Number.isFinite(p.amount) || p.amount <= 0);
    if (invalid) {
      toast.error(t("invalidAmount"));
      return;
    }
    navigate("/results");
  };

  return (
    <>
      <SearchHeader />
      <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
        <SearchInput
          query={query}
          setQuery={setQuery}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <SearchResults query={query} results={results} />
      </div>
      <PlateSection onCalculate={onCalculate} />
    </>
  );
}
