import { useState } from 'react';
import { Product } from '../types';

export const useProductForm = (initialData?: Product) => {
  const [formData, setFormData] = useState<Partial<Product>>(initialData || {
    code: '',
    name: '',
    description: '',
    productGroupId: undefined,
    minStock: 0,
    currentStock: 0,
    warehouseId: undefined,
    defaultPriceTableId: undefined,
  });

  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      productGroupId: undefined,
      minStock: 0,
      currentStock: 0,
      warehouseId: undefined,
      defaultPriceTableId: undefined,
    });
  };

  return {
    formData,
    handleChange,
    resetForm,
  };
};