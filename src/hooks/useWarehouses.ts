import { useQuery } from '@tanstack/react-query';
import { Warehouse } from '../types';

export const useWarehouses = () => {
  return useQuery<Warehouse[]>({
    queryKey: ['warehouses'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        { id: 1, name: 'Depósito Principal' },
        { id: 2, name: 'Depósito Secundário' },
      ];
    },
  });
};