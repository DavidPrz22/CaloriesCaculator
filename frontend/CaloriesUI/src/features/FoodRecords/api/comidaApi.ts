import type { Comida, PaginatedComidas } from '../types';

const API_BASE_URL = 'http://localhost:3000/api/calories';

export async function getComidas(page: number = 1, limit: number = 50, search: string = ''): Promise<PaginatedComidas> {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search
  });
  
  const res = await fetch(`${API_BASE_URL}/comida?${query}`);
  if (!res.ok) {
    throw new Error('Failed to fetch food records');
  }
  return res.json();
}

export async function createComida(data: Partial<Comida>): Promise<Comida> {
  const res = await fetch(`${API_BASE_URL}/comida`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to create food record');
  }
  return res.json();
}

export async function updateComida(id: number, data: Partial<Comida>): Promise<Comida> {
  const res = await fetch(`${API_BASE_URL}/comida/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update food record');
  }
  return res.json();
}

export async function deleteComida(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/comida/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to delete food record');
  }
}
