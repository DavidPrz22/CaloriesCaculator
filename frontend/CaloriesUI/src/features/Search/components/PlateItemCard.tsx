import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { comidas, getMedida, nameOf } from "@/lib/foods";
import { categoryAccent } from "../types/types";

interface PlateItemCardProps {
  item: { comidaId: number; amount: number };
  idx: number;
}

export function PlateItemCard({ item, idx }: PlateItemCardProps) {
  const { t, lang } = useI18n();
  const { setAmount, removeFromPlate } = useStore();

  const c = comidas.find((x) => x.id === item.comidaId)!;
  const m = getMedida(c.medidaId);
  const accent = categoryAccent[c.categoriaId] ?? "var(--primary-soft)";

  return (
    <li
      className="plate-card flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 shadow-sm sm:flex-nowrap"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground shadow-sm"
        style={{ background: accent }}
      >
        {idx + 1}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{nameOf(c, lang)}</p>
        <p className="text-xs text-muted-foreground">
          {c.caloriesPerUnit} {t("kcal")} / {m.abreviation}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center overflow-hidden rounded-lg border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring">
          <Input
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={Number.isFinite(item.amount) ? item.amount : ""}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") {
                setAmount(item.comidaId, 0);
                return;
              }
              const n = Number(raw);
              if (!Number.isFinite(n) || n < 0) return;
              setAmount(item.comidaId, n);
            }}
            onKeyDown={(e) => {
              if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
            }}
            className="h-9 w-20 border-0 bg-transparent text-right text-sm shadow-none focus-visible:ring-0"
            aria-label={t("amount")}
          />
          <span className="pr-3 text-xs font-medium text-muted-foreground">
            {m.abreviation}
          </span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => removeFromPlate(item.comidaId)}
          aria-label={t("remove")}
          className="h-8 w-8 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}
