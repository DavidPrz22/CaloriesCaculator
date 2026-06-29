import { Flame } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/lib/i18n";
import type { CalculatedItem, Nutrition } from "../schemas/schemas";

interface ResultsTableProps {
  items: CalculatedItem[];
  totals: Nutrition;
}

export function ResultsTable({ items, totals }: ResultsTableProps) {
  const { t, lang } = useI18n();

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="text-foreground">{t("food")}</TableHead>
            <TableHead className="text-right text-foreground">{t("consumed")}</TableHead>
            <TableHead className="text-right text-foreground">{t("protein")}</TableHead>
            <TableHead className="text-right text-foreground">{t("carbs")}</TableHead>
            <TableHead className="text-right text-foreground">{t("fat")}</TableHead>
            <TableHead className="text-right text-foreground">{t("calories")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                {t("emptyPlate")}
              </TableCell>
            </TableRow>
          ) : (
            items.map((r) => (
              <TableRow key={r.fdcId}>
                <TableCell className="font-medium">
                  {lang === "es" ? r.names.es : r.names.en}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {r.amount}
                </TableCell>
                <TableCell className="text-right tabular-nums">{Math.round(r.nutrition.protein * 10) / 10} g</TableCell>
                <TableCell className="text-right tabular-nums">{Math.round(r.nutrition.carbs * 10) / 10} g</TableCell>
                <TableCell className="text-right tabular-nums">{Math.round(r.nutrition.fat * 10) / 10} g</TableCell>
                <TableCell className="text-right tabular-nums">
                  {Math.round(r.nutrition.calories)} <span className="text-xs text-muted-foreground">{t("kcal")}</span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        {items.length > 0 && (
          <TableFooter>
            <TableRow className="bg-primary/5 hover:bg-primary/5">
              <TableCell colSpan={2} className="font-display text-base font-semibold">
                {t("total")}
              </TableCell>
              <TableCell className="text-right tabular-nums font-medium">{Math.round(totals.protein * 10) / 10} g</TableCell>
              <TableCell className="text-right tabular-nums font-medium">{Math.round(totals.carbs * 10) / 10} g</TableCell>
              <TableCell className="text-right tabular-nums font-medium">{Math.round(totals.fat * 10) / 10} g</TableCell>
              <TableCell className="text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-display text-base font-semibold text-primary-foreground">
                  <Flame className="h-4 w-4" />
                  {Math.round(totals.calories)} {t("kcal")}
                </span>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
