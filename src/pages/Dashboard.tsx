import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  Truck, 
  Package, 
  ShoppingCart, 
  Receipt
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { useDashboardStats } from '../hooks/useDashboardStats';

export const Dashboard = () => {
  const { data: stats = {} } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visão geral do seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={Users} 
          label="Clientes" 
          value={stats.customers}
          trend={stats.trends?.customers} 
        />
        <StatCard 
          icon={Truck} 
          label="Fornecedores" 
          value={stats.suppliers}
          trend={stats.trends?.suppliers} 
        />
        <StatCard 
          icon={Package} 
          label="Produtos" 
          value={stats.products}
          trend={stats.trends?.products} 
        />
        <StatCard 
          icon={ShoppingCart} 
          label="Pedidos de Compra" 
          value={stats.purchaseOrders}
          trend={stats.trends?.purchaseOrders} 
        />
        <StatCard 
          icon={Receipt} 
          label="Pedidos de Venda" 
          value={stats.salesOrders}
          trend={stats.trends?.salesOrders} 
        />
      </div>
    </div>
  );
};