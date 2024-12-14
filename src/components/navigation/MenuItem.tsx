import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isActive: boolean;
}

export const MenuItem = ({ icon: Icon, label, path, isActive }: MenuItemProps) => (
  <li>
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-amber-50 text-amber-600' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  </li>
);