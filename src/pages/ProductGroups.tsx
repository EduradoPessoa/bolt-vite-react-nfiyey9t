import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTableContainer } from '../components/tables/DataTableContainer';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { ProductGroupForm } from '../components/forms/ProductGroupForm';
import { ProductGroup } from '../types';
import toast from 'react-hot-toast';

export const ProductGroups = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ProductGroup | null>(null);
  const queryClient = useQueryClient();

  const { data: groups = [] } = useQuery({
    queryKey: ['product-groups'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        {
          id: 1,
          code: 'ELET',
          name: 'Eletrônicos',
          description: 'Produtos eletrônicos em geral',
        },
      ];
    },
  });

  const columns = [
    { header: 'Código', accessor: 'code' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Descrição', accessor: 'description' },
  ];

  const filters = [
    { id: 'code', label: 'Código', type: 'text' as const },
    { id: 'name', label: 'Nome', type: 'text' as const },
  ];

  const cardFields = [
    { label: 'Código', value: (group: ProductGroup) => group.code },
    { label: 'Nome', value: (group: ProductGroup) => group.name },
    { label: 'Descrição', value: (group: ProductGroup) => group.description },
  ];

  const handleEdit = (group: ProductGroup) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const handleDelete = (group: ProductGroup) => {
    setSelectedGroup(group);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (data: ProductGroup) => {
    try {
      if (selectedGroup) {
        queryClient.setQueryData(['product-groups'], (old: ProductGroup[] = []) =>
          old.map(g => g.id === selectedGroup.id ? { ...data, id: g.id } : g)
        );
      } else {
        queryClient.setQueryData(['product-groups'], (old: ProductGroup[] = []) => [
          ...old,
          { ...data, id: Math.max(0, ...old.map(g => g.id ?? 0)) + 1 }
        ]);
      }

      toast.success(
        selectedGroup 
          ? 'Grupo atualizado com sucesso!' 
          : 'Grupo cadastrado com sucesso!'
      );
      setIsModalOpen(false);
      setSelectedGroup(null);
    } catch (error) {
      toast.error(
        selectedGroup 
          ? 'Erro ao atualizar grupo' 
          : 'Erro ao cadastrar grupo'
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      queryClient.setQueryData(['product-groups'], (old: ProductGroup[] = []) =>
        old.filter(g => g.id !== selectedGroup?.id)
      );

      toast.success('Grupo excluído com sucesso!');
      setIsDeleteModalOpen(false);
      setSelectedGroup(null);
    } catch (error) {
      toast.error('Erro ao excluir grupo');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Grupos de Produtos</h1>
        <button
          onClick={() => {
            setSelectedGroup(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
        >
          Novo Grupo
        </button>
      </div>

      <DataTableContainer
        data={groups}
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
                {selectedGroup ? 'Editar Grupo' : 'Novo Grupo'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedGroup(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <ProductGroupForm
              initialData={selectedGroup || undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedGroup(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={`o grupo ${selectedGroup?.name}`}
      />
    </div>
  );
};