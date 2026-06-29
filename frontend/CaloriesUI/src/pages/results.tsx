import { Link, useNavigate } from "react-router";
import { ArrowLeft, BookmarkPlus, Flame } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
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
import { usePlateStore, useHistoryStore, type ConsumoDetalle } from "@/ZustandStores";


export default function Results() {
  const { t, lang } = useI18n();
  const nutritionResult = usePlateStore((s) => s.nutritionResult);
  const clearPlate = usePlateStore((s) => s.clearPlate);
  const saveRecord = useHistoryStore((s) => s.saveRecord);
  const navigate = useNavigate();

  const items = nutritionResult?.items || [];
  const totals = nutritionResult?.totals || { calories: 0, protein: 0, carbs: 0, fat: 0 };

  const onSave = () => {
    if (items.length === 0) return;
    const detalles: ConsumoDetalle[] = items.map((r) => ({
      comidaId: r.fdcId,
      cantidad_consumida: r.amount,
      calorias_consumida: r.nutrition.calories,
      protein_consumida: r.nutrition.protein,
      carbs_consumida: r.nutrition.carbs,
      fat_consumida: r.nutrition.fat,
    }));
    saveRecord({
      calorias_consumidas: totals.calories,
      protein_consumida: totals.protein,
      carbs_consumida: totals.carbs,
      fat_consumida: totals.fat,
      detalles,
    });
    clearPlate();
    toast.success(t("saved"));
    navigate("/history");
  };

  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {t("backHome")}
        </Link>
      </div>

      <h1 className="font-display text-4xl font-semibold">{t("results")}</h1>
      <p className="mt-1 text-muted-foreground">{items.length} {t("items")}</p>

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

      <div className="mt-8 flex justify-end">
        <Button
          size="lg"
          onClick={onSave}
          disabled={items.length === 0}
          className="h-12 rounded-full px-7 text-base shadow-md gradient-leaf"
        >
          <BookmarkPlus className="mr-2 h-5 w-5" />
          {t("record")}
        </Button>
      </div>
    </AppShell>
  );
}
