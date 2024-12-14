import { LayoutGrid, LayoutList } from 'lucide-react';

interface ViewToggleProps {
  view: 'list' | 'grid';
  onViewChange: (view: 'list' | 'grid') => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-md transition-colors ${
          view === 'list'
            ? 'bg-amber-100 text-amber-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <LayoutList className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-md transition-colors ${
          view === 'grid'
            ? 'bg-amber-100 text-amber-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
    </div>
  );
};