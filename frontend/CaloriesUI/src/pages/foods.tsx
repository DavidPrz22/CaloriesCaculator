import { Database } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nameOf, comidas, categorias, getCategoria, getMedida } from "@/lib/foods";
import { useI18n } from "@/lib/i18n";


export default function FoodsPage() {

  const { t, lang } = useI18n();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return comidas;
    return comidas.filter(
      (c) =>
        c.nameEN.toLowerCase().includes(term) ||
        c.nameES.toLowerCase().includes(term) ||
        String(c.FDCID).includes(term),
    );
  }, [q]);

  return (
    <AppShell>
      <div className="mb-8 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-primary">
          <Database className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">{t("foodsDb")}</h1>
          <p className="text-sm text-muted-foreground">
            {comidas.length} {t("items")} · {categorias.length} {t("category")}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <Input
          placeholder={t("searchPlaceholder")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="h-11 max-w-md"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>{t("food")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead>{t("measure")}</TableHead>
              <TableHead className="text-right">{t("perUnit")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => {
              const cat = getCategoria(c.categoriaId);
              const m = getMedida(c.medidaId);
              return (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="font-medium">{nameOf(c, lang)}</div>
                    <div className="text-xs text-muted-foreground">FDC #{c.FDCID}</div>
                  </TableCell>
                  <TableCell>{nameOf(cat, lang)}</TableCell>
                  <TableCell>
                    {nameOf(m, lang)}{" "}
                    <span className="text-muted-foreground">({m.abreviation})</span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {c.caloriesPerUnit} {t("kcal")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}
