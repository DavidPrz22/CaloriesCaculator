import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlateStore } from "@/ZustandStores";
import { useI18n } from "@/lib/i18n";
import { PlateHeader } from "./PlateHeader";
import { PlateEmptyState } from "./PlateEmptyState";
import { PlateItemCard } from "./PlateItemCard";

interface PlateSectionProps {
  onCalculate: () => void;
}

export function PlateSection({ onCalculate }: PlateSectionProps) {
  const { t } = useI18n();
  const plate = usePlateStore((s) => s.plate);
  const entries = Object.entries(plate);

  return (
    <section className="mt-10">
      <PlateHeader />

      <div className="rounded-2xl border border-border bg-card/80 p-1 shadow-sm backdrop-blur-sm">
        {entries.length === 0 ? (
          <PlateEmptyState />
        ) : (
          <ul className="space-y-2 p-1">
            {entries.map(([fdcId, entry], ) => (
              <PlateItemCard key={fdcId} fdcId={Number(fdcId)} entry={entry} />
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          size="lg"
          onClick={onCalculate}
          className="h-12 rounded-full px-7 text-base shadow-md gradient-leaf"
        >
          <Calculator className="mr-2 h-5 w-5" />
          {t("calculate")}
        </Button>
      </div>
    </section>
  );
}
