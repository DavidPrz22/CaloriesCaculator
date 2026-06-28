import { useI18n } from "@/lib/i18n";
import { usePlateStore } from "@/ZustandStores";

export function PlateHeader() {
  const { t } = useI18n();
  const plate = usePlateStore((s) => s.plate);
  const count = Object.keys(plate).length;
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-display text-2xl font-semibold">{t("yourPlate")}</h2>
      {count > 0 && (
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {count} {count === 1 ? "item" : "items"}
        </span>
      )}
    </div>
  );
}
