import { useQuery } from '@tanstack/react-query';

interface DashboardStats {
  customers: number;
  suppliers: number;
  products: number;
  purchaseOrders: number;
  salesOrders: number;
  trends: {
    customers: number;
    suppliers: number;
    products: number;
    purchaseOrders: number;
    salesOrders: number;
  };
}

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return {
        customers: 156,
        suppliers: 43,
        products: 289,
        purchaseOrders: 24,
        salesOrders: 67,
        trends: {
          customers: 12,
          suppliers: 5,
          products: -3,
          purchaseOrders: 8,
          salesOrders: 15,
        }
      };
    }
  });
};