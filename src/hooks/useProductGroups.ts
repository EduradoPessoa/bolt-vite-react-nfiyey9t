import { useQuery } from '@tanstack/react-query';
import { ProductGroup } from '../types';

export const useProductGroups = () => {
  return useQuery<ProductGroup[]>({
    queryKey: ['product-groups'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        { id: 1, name: 'Eletrônicos' },
        { id: 2, name: 'Móveis' },
        { id: 3, name: 'Vestuário' },
      ];
    },
  });
};