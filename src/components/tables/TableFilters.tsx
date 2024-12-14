import { Search } from 'lucide-react';
import { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  type: 'text' | 'select';
  options?: { value: string; label: string }[];
}

interface TableFiltersProps {
  filters: FilterOption[];
  onFilterChange: (filters: Record<string, string>) => void;
}

export const TableFilters = ({ filters, onFilterChange }: TableFiltersProps) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleFilterChange = (id: string, value: string) => {
    const newFilters = { ...filterValues, [id]: value };
    setFilterValues(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filters.map((filter) => (
          <div key={filter.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            {filter.type === 'select' ? (
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                value={filterValues[filter.id] || ''}
              >
                <option value="">Todos</option>
                {filter.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 pl-10"
                  placeholder={`Buscar por ${filter.label.toLowerCase()}`}
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  value={filterValues[filter.id] || ''}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};