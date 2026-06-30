import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/lib/i18n";
import { nameOf } from "@/lib/foods";
import { useConsumptionDetail } from "../hooks/queries/queries";
import { getMedida } from "@/lib/foods";
import { Flame } from "lucide-react";

interface ConsumptionDetailModalProps {
  consumptionId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConsumptionDetailModal({
  consumptionId,
  open,
  onOpenChange,
}: ConsumptionDetailModalProps) {
  const { t, lang } = useI18n();
  const { data, isLoading } = useConsumptionDetail(consumptionId);

  if (!consumptionId) return null;

  const date = data ? new Date(data.timestamp) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-250">
        <DialogHeader>
          <DialogTitle>{t("consumptionDetail")}</DialogTitle>
          {date && (
            <p className="text-sm text-muted-foreground">
              {date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
                dateStyle: "medium",
              })}{" "}
              ·{" "}
              {date.toLocaleTimeString(lang === "es" ? "es-ES" : "en-US", {
                timeStyle: "short",
              })}
            </p>
          )}
        </DialogHeader>

        {data && (
          <>
            <div className="flex flex-wrap gap-2 rounded-xl bg-muted/50 p-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 font-display text-sm font-semibold text-primary-foreground">
                <Flame className="h-3.5 w-3.5" />
                {data.calorias_consumidas} {t("kcal")}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {t("protein")} {data.proteinas_consumidas}g
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {t("carbs")} {data.carbohidratos_consumidos}g
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {t("fat")} {data.grasas_consumidas}g
              </span>
            </div>

            {data.detalles.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("food")}</TableHead>
                      <TableHead className="text-right">{t("quantity")}</TableHead>
                      <TableHead className="text-right">{t("calories")}</TableHead>
                      <TableHead className="text-right">{t("macros")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.detalles.map((detalle) => {
                      const comida = detalle.comida;
                      if (!comida) return null;
                      const medida = getMedida(comida.medidaId);
                      const isLiquid = medida.abreviation === "ml" || medida.nameES.toLowerCase().includes("líquido");
                      const baseLabel = isLiquid ? t("per100ml") : t("per100g");

                      return (
                        <TableRow key={detalle.id}>
                          <TableCell className="font-medium">
                            {nameOf(comida, lang)}
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({baseLabel})
                            </span>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {detalle.cantidad_consumida} {medida.abreviation}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {detalle.calorias_consumida} {t("kcal")}
                          </TableCell>
                          <TableCell className="text-right tabular-nums text-xs text-muted-foreground">
                            P {detalle.proteinas_consumidas}g / C{" "}
                            {detalle.carbohidratos_consumidos}g / F{" "}
                            {detalle.grasas_consumidas}g
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}

        {isLoading && (
          <div className="py-8 text-center text-muted-foreground">Loading...</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
