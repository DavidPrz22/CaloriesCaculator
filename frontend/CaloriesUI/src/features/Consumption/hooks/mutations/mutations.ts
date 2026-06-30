import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConsumption } from "../../api/api";
import { useHistoryStore } from "@/ZustandStores/useHistoryStore";
import { toast } from "sonner";

export function useDeleteConsumption() {
  const queryClient = useQueryClient();
  const removeRecord = useHistoryStore((s) => s.removeRecord);

  return useMutation<void, Error, number>({
    mutationFn: deleteConsumption,
    onSuccess: (_, id) => {
      removeRecord(id);
      queryClient.invalidateQueries({ queryKey: ["consumption-detail"] });
      toast.success("Consumption record deleted");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete consumption record");
    },
  });
}
