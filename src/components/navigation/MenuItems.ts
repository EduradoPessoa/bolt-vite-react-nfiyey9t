import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Package, 
  Tag,
  FolderTree,
  Warehouse,
  Table
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: Users,
    label: 'Clientes',
    path: '/customers',
  },
  {
    icon: Truck,
    label: 'Fornecedores',
    path: '/suppliers',
  },
  {
    icon: Package,
    label: 'Produtos',
    path: '/products',
  },
  {
    icon: Tag,
    label: 'Tipos de Produto',
    path: '/product-types',
  },
  {
    icon: FolderTree,
    label: 'Grupos de Produtos',
    path: '/product-groups',
  },
  {
    icon: Warehouse,
    label: 'Almoxarifados',
    path: '/warehouses',
  },
  {
    icon: Table,
    label: 'Tabelas de Preços',
    path: '/price-tables',
  },
];