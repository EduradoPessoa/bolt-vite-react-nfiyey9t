import { useQuery } from '@tanstack/react-query';
import { PriceTable } from '../types';

export const usePriceTables = () => {
  return useQuery<PriceTable[]>({
    queryKey: ['price-tables'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        {
          id: 1,
          code: 'TAB001',
          name: 'Tabela Padrão',
          description: 'Tabela de preços padrão',
          startDate: '2024-03-01',
          endDate: '2024-12-31',
          active: true,
          marginPercentage: 30,
        },
      ];
    },
  });
};