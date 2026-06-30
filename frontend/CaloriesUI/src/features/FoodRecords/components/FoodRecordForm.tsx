import { useState, useEffect } from 'react';
import { useCreateComida, useUpdateComida } from '../hooks/queries/queries';
import type { Comida, Categoria, Medida } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Comida | null;
}

export function FoodRecordForm({ isOpen, onClose, initialData }: Props) {
  const isEditing = !!initialData;
  const createMutation = useCreateComida();
  const updateMutation = useUpdateComida();

  const [categories, setCategories] = useState<Categoria[]>([]);
  const [measures, setMeasures] = useState<Medida[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:3000/api/calories/categories').then(r => r.json()).then(d => setCategories(d.categories));
      fetch('http://localhost:3000/api/calories/units').then(r => r.json()).then(d => setMeasures(d.units));
    }
  }, [isOpen]);

  const [formData, setFormData] = useState<Partial<Comida>>(
    initialData || {
      FDCID: 0,
      nameES: '',
      nameEN: '',
      categoriaId: 1,
      medidaId: 1,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && initialData) {
      await updateMutation.mutateAsync({ id: initialData.id, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Food Record' : 'Create Food Record'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>FDCID</Label>
              <Input type="number" name="FDCID" value={formData.FDCID || ''} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Name (ES)</Label>
            <Input name="nameES" value={formData.nameES || ''} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label>Name (EN)</Label>
            <Input name="nameEN" value={formData.nameEN || ''} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={String(formData.categoriaId)} onValueChange={(val) => setFormData(p => ({ ...p, categoriaId: parseInt(val) }))}>
                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.nameEN}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Measure</Label>
              <Select value={String(formData.medidaId)} onValueChange={(val) => setFormData(p => ({ ...p, medidaId: parseInt(val) }))}>
                <SelectTrigger><SelectValue placeholder="Select Measure" /></SelectTrigger>
                <SelectContent>
                  {measures.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.nameEN}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Kcal</Label>
              <Input type="number" step="0.01" name="calories" value={formData.calories ?? ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Protein</Label>
              <Input type="number" step="0.01" name="protein" value={formData.protein ?? ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Carbs</Label>
              <Input type="number" step="0.01" name="carbs" value={formData.carbs ?? ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Fat</Label>
              <Input type="number" step="0.01" name="fat" value={formData.fat ?? ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {isEditing ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
