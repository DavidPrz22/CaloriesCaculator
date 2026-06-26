import { Utensils } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function PlateEmptyState() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-muted/60 text-muted-foreground">
        <Utensils className="h-6 w-6" />
      </div>
      <p className="text-sm text-muted-foreground">{t("emptyPlate")}</p>
    </div>
  );
}
