import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PersonForm } from '../components/forms/PersonForm';
import { DataTableContainer } from '../components/tables/DataTableContainer';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { Supplier } from '../types';
import { states } from '../utils/states';
import toast from 'react-hot-toast';

export const Suppliers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const queryClient = useQueryClient();

  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        {
          id: 1,
          name: 'Fornecedor ABC',
          personType: 'PJ' as const,
          document: '12.345.678/0001-90',
          email: 'contato@fornecedor.com',
          phone: '(11) 3456-7890',
          state: 'SP',
          city: 'São Paulo',
          address: 'Av. Comercial, 1000',
        },
        // Add more mock data as needed
      ];
    },
  });

  const columns = [
    { header: 'Nome', accessor: 'name' },
    { header: 'Documento', accessor: 'document' },
    { header: 'Email', accessor: 'email' },
    { header: 'Telefone', accessor: 'phone' },
    { header: 'Estado', accessor: 'state' },
    { header: 'Cidade', accessor: 'city' },
  ];

  const filters = [
    { id: 'name', label: 'Nome', type: 'text' as const },
    { id: 'document', label: 'Documento', type: 'text' as const },
    {
      id: 'state',
      label: 'Estado',
      type: 'select' as const,
      options: states.map(state => ({
        value: state.uf,
        label: state.name,
      })),
    },
  ];

  const cardFields = [
    { label: 'Nome', value: (supplier: Supplier) => supplier.name },
    { label: 'Telefone', value: (supplier: Supplier) => supplier.phone },
    { label: 'Email', value: (supplier: Supplier) => supplier.email },
    { label: 'Estado', value: (supplier: Supplier) => supplier.state },
  ];

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (data: Supplier) => {
    try {
      // In a real app, this would be an API call
      // Simulate optimistic update
      if (selectedSupplier) {
        queryClient.setQueryData(['suppliers'], (old: Supplier[] = []) =>
          old.map(s => s.id === selectedSupplier.id ? { ...data, id: s.id } : s)
        );
      } else {
        queryClient.setQueryData(['suppliers'], (old: Supplier[] = []) => [
          ...old,
          { ...data, id: Math.max(0, ...old.map(s => s.id ?? 0)) + 1 }
        ]);
      }

      toast.success(
        selectedSupplier 
          ? 'Fornecedor atualizado com sucesso!' 
          : 'Fornecedor cadastrado com sucesso!'
      );
      setIsModalOpen(false);
      setSelectedSupplier(null);
    } catch (error) {
      toast.error(
        selectedSupplier 
          ? 'Erro ao atualizar fornecedor' 
          : 'Erro ao cadastrar fornecedor'
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      // In a real app, this would be an API call
      // Simulate optimistic delete
      queryClient.setQueryData(['suppliers'], (old: Supplier[] = []) =>
        old.filter(s => s.id !== selectedSupplier?.id)
      );

      toast.success('Fornecedor excluído com sucesso!');
      setIsDeleteModalOpen(false);
      setSelectedSupplier(null);
    } catch (error) {
      toast.error('Erro ao excluir fornecedor');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Fornecedores</h1>
        <button
          onClick={() => {
            setSelectedSupplier(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
        >
          Novo Fornecedor
        </button>
      </div>

      <DataTableContainer
        data={suppliers}
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
                {selectedSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedSupplier(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <PersonForm
              type="supplier"
              initialData={selectedSupplier || undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSupplier(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={`o fornecedor ${selectedSupplier?.name}`}
      />
    </div>
  );
};