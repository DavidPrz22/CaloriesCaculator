import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categorias, nameOf } from "@/lib/foods";
import { useI18n } from "@/lib/i18n";

interface CategorySelectProps {
  categoryId: string;
  setCategoryId: (val: string) => void;
}

export function CategorySelect({ categoryId, setCategoryId }: CategorySelectProps) {
  const { t, lang } = useI18n();

  return (
    <div className="sm:w-56">
      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger className="h-12 border-0 bg-muted/70">
          <SelectValue placeholder={t("category")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("allCategories")}</SelectItem>
          {categorias.map((c) => (
            <SelectItem key={c.id} value={String(c.id)}>
              {nameOf(c, lang)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
