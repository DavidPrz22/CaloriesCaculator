import { AppShell } from "@/components/AppShell";
import { usePlateStore } from "@/ZustandStores";
import { ResultsHeader } from "./ResultsHeader";
import { ResultsTable } from "./ResultsTable";
import { ResultsAction } from "./ResultsAction";
import { useSaveConsumption } from "../hooks/mutations/mutation";

export function ResultsView() {
  const nutritionResult = usePlateStore((s) => s.nutritionResult);
  const saveConsumption = useSaveConsumption();

  const items = nutritionResult?.items || [];
  const totals = nutritionResult?.totals || { calories: 0, protein: 0, carbs: 0, fat: 0 };

  const onSave = () => {
    if (items.length === 0) return;
    saveConsumption.mutate({ totals, items });
  };

  return (
    <AppShell>
      <ResultsHeader itemsCount={items.length} />
      <ResultsTable items={items} totals={totals} />
      <ResultsAction onSave={onSave} disabled={items.length === 0 || saveConsumption.isPending} />
    </AppShell>
  );
}
