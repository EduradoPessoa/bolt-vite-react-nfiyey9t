import { useState } from 'react';
import { DataTableContainer } from '../components/tables/DataTableContainer';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { ProductTypeForm } from '../components/forms/ProductTypeForm';
import { ProductType } from '../types';
import { useProductTypes } from '../hooks/useProductTypes';

export const ProductTypes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const { data: types = [], create, update, remove } = useProductTypes();

  const columns = [
    { header: 'Código', accessor: 'code' },
    { header: 'Descrição', accessor: 'description' },
  ];

  const filters = [
    { id: 'code', label: 'Código', type: 'text' as const },
    { id: 'description', label: 'Descrição', type: 'text' as const },
  ];

  const cardFields = [
    { label: 'Código', value: (type: ProductType) => type.code },
    { label: 'Descrição', value: (type: ProductType) => type.description },
  ];

  const handleEdit = (type: ProductType) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const handleDelete = (type: ProductType) => {
    setSelectedType(type);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (data: ProductType) => {
    if (selectedType) {
      await update({ ...data, id: selectedType.id });
    } else {
      await create(data);
    }
    setIsModalOpen(false);
    setSelectedType(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedType?.id) {
      await remove(selectedType.id);
      setIsDeleteModalOpen(false);
      setSelectedType(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tipos de Produto</h1>
        <button
          onClick={() => {
            setSelectedType(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
        >
          Novo Tipo
        </button>
      </div>

      <DataTableContainer
        data={types}
        columns={columns}
        filters={filters}
        cardFields={cardFields}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedType ? 'Editar Tipo' : 'Novo Tipo'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedType(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <ProductTypeForm
              initialData={selectedType || undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedType(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={`o tipo ${selectedType?.code}`}
      />
    </div>
  );
};