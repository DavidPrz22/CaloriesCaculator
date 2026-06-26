import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export function PlateHeader() {
  const { t } = useI18n();
  const { plate } = useStore();
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-display text-2xl font-semibold">{t("yourPlate")}</h2>
      {plate.length > 0 && (
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {plate.length} {plate.length === 1 ? "item" : "items"}
        </span>
      )}
    </div>
  );
}
