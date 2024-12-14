import { useState, useMemo } from 'react';

interface PaginationOptions {
  data: any[];
  itemsPerPage: number;
  filters?: Record<string, string>;
}

export const usePagination = ({ data, itemsPerPage, filters = {} }: PaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = String(item[key]).toLowerCase();
        return itemValue.includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  };
};