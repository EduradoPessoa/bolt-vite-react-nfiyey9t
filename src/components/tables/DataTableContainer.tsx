import { useState } from 'react';
import { DataTable } from './DataTable';
import { TableFilters } from './TableFilters';
import { Pagination } from './Pagination';
import { ViewToggle } from './ViewToggle';
import { ItemCard } from '../cards/ItemCard';
import { usePagination } from '../../hooks/usePagination';

interface DataTableContainerProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
  }[];
  filters: {
    id: string;
    label: string;
    type: 'text' | 'select';
    options?: { value: string; label: string }[];
  }[];
  cardFields: {
    label: string;
    value: (item: T) => React.ReactNode;
  }[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTableContainer<T>({
  data,
  columns,
  filters,
  cardFields,
  onEdit,
  onDelete,
}: DataTableContainerProps<T>) {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
    data,
    itemsPerPage: 10,
    filters: activeFilters,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <TableFilters
          filters={filters}
          onFilterChange={setActiveFilters}
        />
        <ViewToggle
          view={view}
          onViewChange={setView}
        />
      </div>

      {view === 'list' ? (
        <DataTable
          data={paginatedData}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((item, index) => (
            <ItemCard
              key={index}
              item={item}
              fields={cardFields}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
}