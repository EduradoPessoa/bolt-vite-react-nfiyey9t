import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTableContainer } from '../components/tables/DataTableContainer';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { WarehouseForm } from '../components/forms/WarehouseForm';
import { Warehouse } from '../types';
import toast from 'react-hot-toast';

export const Warehouses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const queryClient = useQueryClient();

  const { data: warehouses = [] } = useQuery({
    queryKey: ['warehouses'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        {
          id: 1,
          code: 'DEP001',
          name: 'Depósito Principal',
          description: 'Depósito principal da empresa',
          allowOutput: true,
        },
      ];
    },
  });

  const columns = [
    { header: 'Código', accessor: 'code' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Descrição', accessor: 'description' },
    { header: 'Permite Saída', accessor: (warehouse: Warehouse) => 
      warehouse.allowOutput ? 'Sim' : 'Não'
    },
  ];

  const filters = [
    { id: 'code', label: 'Código', type: 'text' as const },
    { id: 'name', label: 'Nome', type: 'text' as const },
    { 
      id: 'allowOutput', 
      label: 'Permite Saída', 
      type: 'select' as const,
      options: [
        { value: 'true', label: 'Sim' },
        { value: 'false', label: 'Não' },
      ],
    },
  ];

  const cardFields = [
    { label: 'Código', value: (warehouse: Warehouse) => warehouse.code },
    { label: 'Nome', value: (warehouse: Warehouse) => warehouse.name },
    { label: 'Descrição', value: (warehouse: Warehouse) => warehouse.description },
  ];

  const handleEdit = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsModalOpen(true);
  };

  const handleDelete = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (data: Warehouse) => {
    try {
      if (selectedWarehouse) {
        queryClient.setQueryData(['warehouses'], (old: Warehouse[] = []) =>
          old.map(w => w.id === selectedWarehouse.id ? { ...data, id: w.id } : w)
        );
      } else {
        queryClient.setQueryData(['warehouses'], (old: Warehouse[] = []) => [
          ...old,
          { ...data, id: Math.max(0, ...old.map(w => w.id ?? 0)) + 1 }
        ]);
      }

      toast.success(
        selectedWarehouse 
          ? 'Almoxarifado atualizado com sucesso!' 
          : 'Almoxarifado cadastrado com sucesso!'
      );
      setIsModalOpen(false);
      setSelectedWarehouse(null);
    } catch (error) {
      toast.error(
        selectedWarehouse 
          ? 'Erro ao atualizar almoxarifado' 
          : 'Erro ao cadastrar almoxarifado'
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      queryClient.setQueryData(['warehouses'], (old: Warehouse[] = []) =>
        old.filter(w => w.id !== selectedWarehouse?.id)
      );

      toast.success('Almoxarifado excluído com sucesso!');
      setIsDeleteModalOpen(false);
      setSelectedWarehouse(null);
    } catch (error) {
      toast.error('Erro ao excluir almoxarifado');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Almoxarifados</h1>
        <button
          onClick={() => {
            setSelectedWarehouse(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
        >
          Novo Almoxarifado
        </button>
      </div>

      <DataTableContainer
        data={warehouses}
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
                {selectedWarehouse ? 'Editar Almoxarifado' : 'Novo Almoxarifado'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedWarehouse(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <WarehouseForm
              initialData={selectedWarehouse || undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedWarehouse(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={`o almoxarifado ${selectedWarehouse?.name}`}
      />
    </div>
  );
};