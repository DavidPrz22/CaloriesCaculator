import { History as HistoryIcon, Flame } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { comidas, getMedida, nameOf } from "@/lib/foods";
import { useI18n } from "@/lib/i18n";
import { useHistoryStore } from "@/ZustandStores";


export default function HistoryPage() {
  const { t, lang } = useI18n();
  const history = useHistoryStore((s) => s.history);

  return (
    <AppShell>
      <div className="mb-8 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-primary">
          <HistoryIcon className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">{t("history")}</h1>
          <p className="text-sm text-muted-foreground">{history.length} {t("items")}</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center text-muted-foreground">
          {t("noHistory")}
        </div>
      ) : (
        <ul className="space-y-4">
          {history.map((r) => {
            const date = new Date(r.timestamp);
            const totalProtein = r.protein_consumida ?? 0;
            const totalCarbs = r.carbs_consumida ?? 0;
            const totalFat = r.fat_consumida ?? 0;
            return (
              <li key={r.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 px-5 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("date")}</p>
                    <p className="font-medium">
                      {date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
                        dateStyle: "medium",
                      })}{" "}
                      ·{" "}
                      {date.toLocaleTimeString(lang === "es" ? "es-ES" : "en-US", {
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {t("protein")} {totalProtein}g
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {t("carbs")} {totalCarbs}g
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {t("fat")} {totalFat}g
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-display text-sm font-semibold text-primary-foreground">
                      <Flame className="h-3.5 w-3.5" />
                      {r.calorias_consumidas} {t("kcal")}
                    </span>
                  </div>
                </div>
                <ul className="divide-y divide-border">
                  {r.detalles.map((d, i) => {
                    const c = comidas.find((x) => x.id === d.comidaId);
                    if (!c) return null;
                    const m = getMedida(c.medidaId);
                    const protein = d.protein_consumida ?? 0;
                    const carbs = d.carbs_consumida ?? 0;
                    const fat = d.fat_consumida ?? 0;
                    return (
                      <li key={i} className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 text-sm">
                        <span className="font-medium">{nameOf(c, lang)}</span>
                        <span className="text-muted-foreground tabular-nums">
                          {d.cantidad_consumida} {m.abreviation} · {d.calorias_consumida} {t("kcal")}
                          {protein > 0 || carbs > 0 || fat > 0 ? (
                            <> · P {protein}g / C {carbs}g / F {fat}g</>
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}
