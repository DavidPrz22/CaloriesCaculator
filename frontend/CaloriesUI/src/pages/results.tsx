import { Link, useNavigate } from "react-router";
import { ArrowLeft, BookmarkPlus, Flame } from "lucide-react";
import { useMemo } from "react";
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
import { comidas, getMedida, nameOf } from "@/lib/foods";
import { useI18n } from "@/lib/i18n";
import { useStore, type ConsumoDetalle } from "@/lib/store";


export default function Results() {
  const { t, lang } = useI18n();
  const { plate, saveRecord, clearPlate } = useStore();
  const navigate = useNavigate();

  const rows = useMemo(() => {
    return plate
      .map((item) => {
        const c = comidas.find((x) => x.id === item.comidaId);
        if (!c) return null;
        const m = getMedida(c.medidaId);
        const amount = item.amount;
        const calories = Math.round(c.caloriesPerUnit * amount);
        const protein = Math.round(c.proteinPerUnit * amount * 10) / 10;
        const carbs = Math.round(c.carbsPerUnit * amount * 10) / 10;
        const fat = Math.round(c.fatPerUnit * amount * 10) / 10;
        return { comida: c, medida: m, amount, calories, protein, carbs, fat };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
  }, [plate]);

  const totalCalories = rows.reduce((sum, r) => sum + r.calories, 0);
  const totalProtein = Math.round(rows.reduce((sum, r) => sum + r.protein, 0) * 10) / 10;
  const totalCarbs = Math.round(rows.reduce((sum, r) => sum + r.carbs, 0) * 10) / 10;
  const totalFat = Math.round(rows.reduce((sum, r) => sum + r.fat, 0) * 10) / 10;

  const onSave = () => {
    if (rows.length === 0) return;
    const detalles: ConsumoDetalle[] = rows.map((r) => ({
      comidaId: r.comida.id,
      cantidad_consumida: r.amount,
      calorias_consumida: r.calories,
      protein_consumida: r.protein,
      carbs_consumida: r.carbs,
      fat_consumida: r.fat,
    }));
    saveRecord({
      calorias_consumidas: totalCalories,
      protein_consumida: totalProtein,
      carbs_consumida: totalCarbs,
      fat_consumida: totalFat,
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
      <p className="mt-1 text-muted-foreground">{rows.length} {t("items")}</p>

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
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  {t("emptyPlate")}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r.comida.id}>
                  <TableCell className="font-medium">{nameOf(r.comida, lang)}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.amount} {r.medida.abreviation}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{r.protein} g</TableCell>
                  <TableCell className="text-right tabular-nums">{r.carbs} g</TableCell>
                  <TableCell className="text-right tabular-nums">{r.fat} g</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.calories} <span className="text-xs text-muted-foreground">{t("kcal")}</span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {rows.length > 0 && (
            <TableFooter>
              <TableRow className="bg-primary/5 hover:bg-primary/5">
                <TableCell colSpan={2} className="font-display text-base font-semibold">
                  {t("total")}
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">{totalProtein} g</TableCell>
                <TableCell className="text-right tabular-nums font-medium">{totalCarbs} g</TableCell>
                <TableCell className="text-right tabular-nums font-medium">{totalFat} g</TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-display text-base font-semibold text-primary-foreground">
                    <Flame className="h-4 w-4" />
                    {totalCalories} {t("kcal")}
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
          disabled={rows.length === 0}
          className="h-12 rounded-full px-7 text-base shadow-md gradient-leaf"
        >
          <BookmarkPlus className="mr-2 h-5 w-5" />
          {t("record")}
        </Button>
      </div>
    </AppShell>
  );
}
