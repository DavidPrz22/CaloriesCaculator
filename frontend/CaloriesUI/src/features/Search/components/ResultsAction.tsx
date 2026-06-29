import { BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

interface ResultsActionProps {
  onSave: () => void;
  disabled: boolean;
}

export function ResultsAction({ onSave, disabled }: ResultsActionProps) {
  const { t } = useI18n();

  return (
    <div className="mt-8 flex justify-end">
      <Button
        size="lg"
        onClick={onSave}
        disabled={disabled}
        className="h-12 rounded-full px-7 text-base shadow-md gradient-leaf"
      >
        <BookmarkPlus className="mr-2 h-5 w-5" />
        {t("record")}
      </Button>
    </div>
  );
}
