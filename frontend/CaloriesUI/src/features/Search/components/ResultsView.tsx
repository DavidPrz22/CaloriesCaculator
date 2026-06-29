import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { usePlateStore, useHistoryStore } from "@/ZustandStores";
import type { ConsumoDetalle } from "@/ZustandStores/useHistoryStore";
import { useI18n } from "@/lib/i18n";
import { ResultsHeader } from "./ResultsHeader";
import { ResultsTable } from "./ResultsTable";
import { ResultsAction } from "./ResultsAction";

export function ResultsView() {
  const { t } = useI18n();
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
      <ResultsHeader itemsCount={items.length} />
      <ResultsTable items={items} totals={totals} />
      <ResultsAction onSave={onSave} disabled={items.length === 0} />
    </AppShell>
  );
}
