import { Check, Plus, Utensils } from "lucide-react";
import { getMedida, nameOf, type Comida } from "@/lib/foods";
import { categoryIcons, categoryAccent } from "../types/types";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

interface SearchResultCardProps {
  c: Comida;
}

export function SearchResultCard({ c }: SearchResultCardProps) {
  const { lang } = useI18n();
  const { plate, addToPlate } = useStore();

  const m = getMedida(c.medidaId);
  const inPlate = plate.some((p) => p.comidaId === c.id);
  const accent = categoryAccent[c.categoriaId] ?? "var(--primary-soft)";

  return (
    <li>
      <button
        type="button"
        onClick={() => !inPlate && addToPlate(c.id)}
        disabled={inPlate}
        className="group flex w-full items-center gap-3 rounded-xl border border-transparent bg-card px-3 py-2.5 text-left shadow-sm transition-all hover:border-primary-soft/40 hover:shadow-md hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
      >
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-primary-foreground shadow-sm transition group-hover:scale-105"
          style={{ background: accent }}
        >
          {categoryIcons[c.categoriaId] ?? <Utensils className="h-4 w-4" />}
        </span>
        <span className="min-w-0 flex-1 truncate">
          <span className="block truncate font-medium text-foreground">
            {nameOf(c, lang)}
          </span>
          <span className="block text-xs text-muted-foreground">
            {m.abreviation}
          </span>
        </span>
        {inPlate ? (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            <Check className="h-3 w-3" />
            Added
          </span>
        ) : (
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary opacity-0 transition group-hover:opacity-100">
            <Plus className="h-4 w-4" />
          </span>
        )}
      </button>
    </li>
  );
}
