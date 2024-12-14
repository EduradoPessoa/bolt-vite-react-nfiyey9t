import { LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { MenuItem } from './navigation/MenuItem';
import { menuItems } from './navigation/MenuItems';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <Logo />
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              {...item}
              isActive={location.pathname === item.path}
            />
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 w-full text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};