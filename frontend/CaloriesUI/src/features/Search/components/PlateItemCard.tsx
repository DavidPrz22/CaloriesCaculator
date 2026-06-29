import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlateStore } from "@/ZustandStores";
import { useI18n } from "@/lib/i18n";
import { categoryAccent } from "../data/constants";
import type { PlateEntry } from "../types/types";

interface PlateItemCardProps {
  fdcId: number;
  entry: PlateEntry;
}

export function PlateItemCard({ fdcId, entry }: PlateItemCardProps) {
  const { t, lang } = useI18n();
  const setAmount = usePlateStore((s) => s.setAmount);
  const removeFromPlate = usePlateStore((s) => s.removeFromPlate);
  
  const name = lang === "es" ? entry.nameES : entry.nameEN;
  const category = lang === "es" ? entry.categoria.nameES : entry.categoria.nameEN;
  const accent = categoryAccent[entry.categoria.id]

  return (
    <li className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        <div className="min-w-0 flex-1 flex gap-2">
          <p className="font-medium text-foreground text-left">{name}</p>
          <span
              className="inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.06rem]"
              style={{ backgroundColor: `${accent}25`, color: accent }}
            >
              {category}
            </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center overflow-hidden rounded-lg border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring">
            <Input
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={Number.isFinite(entry.amount) ? entry.amount : ""}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "") {
                  setAmount(fdcId, 0);
                  return;
                }
                const n = Number(raw);
                if (!Number.isFinite(n) || n < 0) return;
                setAmount(fdcId, n);
              }}
              onKeyDown={(e) => {
                if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
              }}
              className="h-9 w-20 border-0 bg-transparent text-right text-sm shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              aria-label={t("amount")}
            />
            <span className="pr-3 text-xs font-medium">
              {entry.medidaAbreviation} 
            </span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => removeFromPlate(fdcId)}
            aria-label={t("remove")}
            className="h-8 w-8 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
        <span>
          <span className="font-medium text-foreground">{entry.calories}</span> {t("kcal")}
        </span>
        <span>
          <span className="font-medium text-foreground">{entry.protein}g</span> {t("protein")}
        </span>
        <span>
          <span className="font-medium text-foreground">{entry.carbs}g</span> {t("carbs")}
        </span>
        <span>
          <span className="font-medium text-foreground">{entry.fat}g</span> {t("fat")}
        </span>
        <span>
          { lang === "en" ? <span className="font-medium text-foreground">Per (100{entry.medidaAbreviation})</span>
            : <span className="font-medium text-foreground">Cada (100{entry.medidaAbreviation})</span>
          }
        </span>
      </div>
    </li>
  );
}
