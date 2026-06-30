import type { Comida } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface Props {
  data: Comida[];
  isLoading: boolean;
  onEdit: (comida: Comida) => void;
  onDelete: (id: number) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function FoodRecordsTable({ data, isLoading, onEdit, onDelete, page, totalPages, onPageChange }: Props) {
  const { t, lang } = useI18n();

  const nameOf = (item: { nameES: string; nameEN: string } | undefined) => {
    if (!item) return '';
    return lang === 'es' ? item.nameES : item.nameEN;
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[30%] text-left whitespace-normal break-words p-2">{t("food") || "Food"}</TableHead>
              <TableHead>{t("category") || "Category"}</TableHead>
              <TableHead>{t("measure") || "Measure"}</TableHead>
              <TableHead className="text-right">Kcal (100g/ml)</TableHead>
              <TableHead className="text-right">Protein</TableHead>
              <TableHead className="text-right">Carbs</TableHead>
              <TableHead className="text-right">Fat</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="w-[30%] text-left whitespace-normal break-words p-2">
                    <div className="font-medium">{nameOf(c)}</div>
                    <div className="text-xs text-muted-foreground">FDC #{c.FDCID}</div>
                  </TableCell>
                  <TableCell>{nameOf(c.categoria)}</TableCell>
                  <TableCell>
                    {nameOf(c.medida)}{" "}
                    <span className="text-muted-foreground">({c.medida?.abreviation})</span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{c.calories ?? '-'}</TableCell>
                  <TableCell className="text-right tabular-nums">{c.protein ?? '-'}</TableCell>
                  <TableCell className="text-right tabular-nums">{c.carbs ?? '-'}</TableCell>
                  <TableCell className="text-right tabular-nums">{c.fat ?? '-'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(c)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(c.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center px-2">
          <Button 
            variant="outline" 
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button 
            variant="outline" 
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
