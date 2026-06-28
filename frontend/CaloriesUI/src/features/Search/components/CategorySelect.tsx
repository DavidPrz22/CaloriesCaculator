import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { useCategories } from "../hooks/queries/queries";

interface CategorySelectProps {
  categoryId: string;
  setCategoryId: (val: string) => void;
}

export function CategorySelect({ categoryId, setCategoryId }: CategorySelectProps) {
  const { t, lang } = useI18n();
  const { data: categories = [] } = useCategories();

  const selectedCategory = categories.find((c) => String(c.id) === categoryId);

  return (
    <div className="sm:w-56">
      <Select
        value={selectedCategory ? String(categoryId) : undefined}
        onValueChange={setCategoryId}
      >
        <SelectTrigger className="h-12 border-0 bg-muted/70">
          <SelectValue placeholder={t("category")} />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c) => (
            <SelectItem key={c.id} value={String(c.id)}>
              {lang === "es" ? c.nameES : c.nameEN}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
