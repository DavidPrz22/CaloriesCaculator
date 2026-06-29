import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ResultsHeader({ itemsCount }: { itemsCount: number }) {
  const { t } = useI18n();
  
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {t("backHome")}
        </Link>
      </div>

      <h1 className="font-display text-4xl font-semibold">{t("results")}</h1>
      <p className="mt-1 text-muted-foreground">{itemsCount} {t("items")}</p>
    </>
  );
}
