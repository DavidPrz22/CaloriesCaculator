import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComidas, createComida, updateComida, deleteComida } from '../../api/comidaApi';
import type { Comida, PaginatedComidas } from '../../types';
import { toast } from 'sonner';

export function useComidas(page: number, limit: number, search: string) {
  return useQuery<PaginatedComidas, Error>({
    queryKey: ['comidas', { page, limit, search }],
    queryFn: () => getComidas(page, limit, search),
    placeholderData: (previousData) => previousData,
  });
}

export function useCreateComida() {
  const queryClient = useQueryClient();
  
  return useMutation<Comida, Error, Partial<Comida>>({
    mutationFn: createComida,
    onSuccess: () => {
      toast.success('Food record created successfully');
      queryClient.invalidateQueries({ queryKey: ['comidas'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create food record');
    }
  });
}

export function useUpdateComida() {
  const queryClient = useQueryClient();
  
  return useMutation<Comida, Error, { id: number; data: Partial<Comida> }>({
    mutationFn: ({ id, data }) => updateComida(id, data),
    onSuccess: () => {
      toast.success('Food record updated successfully');
      queryClient.invalidateQueries({ queryKey: ['comidas'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update food record');
    }
  });
}

export function useDeleteComida() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, number>({
    mutationFn: deleteComida,
    onSuccess: () => {
      toast.success('Food record deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['comidas'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete food record');
    }
  });
}
