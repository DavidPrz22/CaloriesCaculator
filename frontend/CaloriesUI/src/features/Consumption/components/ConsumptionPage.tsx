import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { useConsumptionHistory } from "../hooks/queries/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CalendarIcon, Trash2, Eye, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { ConsumptionDetailModal } from "./ConsumptionDetailModal";
import { useDeleteConsumption } from "../hooks/mutations/mutations";
import type { DateRange } from "react-day-picker";

const PAGE_SIZE = 50;

export function ConsumptionPage() {
  const { t, lang } = useI18n();

  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [detailId, setDetailId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const deleteMutation = useDeleteConsumption();

  const startDate = dateRange.from ? dateRange.from.toISOString() : undefined;
  const endDate = dateRange.to
    ? dateRange.to.toISOString()
    : dateRange.from
      ? new Date(dateRange.from.setHours(23, 59, 59, 999)).toISOString()
      : undefined;

  const { data: history = [], isLoading: loading } = useConsumptionHistory(page, PAGE_SIZE, startDate, endDate);

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const clearFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setPage(1);
  };

  const dateLocale = lang === "es" ? es : enUS;

  return (
    <AppShell>
      <div className="mb-8 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-primary">
          <CalendarDays className="h-5 w-5" />
        </span>
        <div>
          <div className="font-display text-3xl font-semibold sm:text-4xl">
            {t("consumption")}
          </div>
          <p className="text-sm text-muted-foreground">
            {history.length} {t("items")}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d, yyyy", { locale: dateLocale })} -{" "}
                    {format(dateRange.to, "MMM d, yyyy", { locale: dateLocale })}
                  </>
                ) : (
                  format(dateRange.from, "MMM d, yyyy", { locale: dateLocale })
                )
              ) : (
                <span>
                  {t("fromDate")} - {t("toDate")}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range ?? { from: undefined, to: undefined });
                if (range?.from && !range.to) {
                  setCalendarOpen(false);
                }
              }}
              numberOfMonths={2}
              locale={dateLocale}
            />
          </PopoverContent>
        </Popover>

        {(dateRange.from || dateRange.to) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            {t("clearFilters")}
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            {t("previous")}
          </Button>
          <span className="text-sm text-muted-foreground">
            {t("page")} {page}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={history.length < PAGE_SIZE}
            onClick={() => setPage((p) => p + 1)}
          >
            {t("next")}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          Loading...
        </div>
      ) : history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center text-muted-foreground">
          {t("noConsumptions")}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("dateTime")}</TableHead>
                <TableHead className="text-right">{t("totalCalories")}</TableHead>
                <TableHead className="text-right">{t("totalProtein")}</TableHead>
                <TableHead className="text-right">{t("totalCarbs")}</TableHead>
                <TableHead className="text-right">{t("totalFat")}</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((record) => {
                const date = new Date(record.timestamp);
                return (
                  <TableRow
                    key={record.id}
                    className="cursor-pointer"
                    onClick={() => setDetailId(record.id)}
                  >
                    <TableCell className="font-medium">
                      {date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
                        dateStyle: "medium",
                      })}{" "}
                      ·{" "}
                      {date.toLocaleTimeString(lang === "es" ? "es-ES" : "en-US", {
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {record.calorias_consumidas} {t("kcal")}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {record.protein_consumida}g
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {record.carbs_consumida}g
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {record.fat_consumida}g
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailId(record.id);
                          }}
                          title={t("viewDetails")}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(record.id);
                          }}
                          title={t("deleteConsumption")}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <ConsumptionDetailModal
        consumptionId={detailId}
        open={detailId !== null}
        onOpenChange={(open) => {
          if (!open) setDetailId(null);
        }}
      />

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmDelete")}</AlertDialogTitle>
            <AlertDialogDescription>{t("confirmDeleteDesc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("deleteConsumption")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}
