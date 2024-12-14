import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PersonForm } from '../components/forms/PersonForm';
import { DataTableContainer } from '../components/tables/DataTableContainer';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { Customer } from '../types';
import { states } from '../utils/states';
import toast from 'react-hot-toast';

export const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const queryClient = useQueryClient();

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        {
          id: 1,
          name: 'João Silva',
          personType: 'PF' as const,
          document: '123.456.789-00',
          email: 'joao@example.com',
          phone: '(11) 98765-4321',
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Example, 123',
        },
        // Add more mock data as needed
      ];
    },
  });

  const columns = [
    { header: 'Nome', accessor: 'name' },
    { header: 'Tipo', accessor: (customer: Customer) => 
      customer.personType === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica' 
    },
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
      id: 'personType', 
      label: 'Tipo', 
      type: 'select' as const,
      options: [
        { value: 'PF', label: 'Pessoa Física' },
        { value: 'PJ', label: 'Pessoa Jurídica' },
      ],
    },
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
    { label: 'Nome', value: (customer: Customer) => customer.name },
    { label: 'Telefone', value: (customer: Customer) => customer.phone },
    { label: 'Email', value: (customer: Customer) => customer.email },
    { label: 'Estado', value: (customer: Customer) => customer.state },
  ];

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (data: Customer) => {
    try {
      // In a real app, this would be an API call
      // Simulate optimistic update
      if (selectedCustomer) {
        queryClient.setQueryData(['customers'], (old: Customer[] = []) =>
          old.map(c => c.id === selectedCustomer.id ? { ...data, id: c.id } : c)
        );
      } else {
        queryClient.setQueryData(['customers'], (old: Customer[] = []) => [
          ...old,
          { ...data, id: Math.max(0, ...old.map(c => c.id ?? 0)) + 1 }
        ]);
      }

      toast.success(
        selectedCustomer 
          ? 'Cliente atualizado com sucesso!' 
          : 'Cliente cadastrado com sucesso!'
      );
      setIsModalOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      toast.error(
        selectedCustomer 
          ? 'Erro ao atualizar cliente' 
          : 'Erro ao cadastrar cliente'
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      // In a real app, this would be an API call
      // Simulate optimistic delete
      queryClient.setQueryData(['customers'], (old: Customer[] = []) =>
        old.filter(c => c.id !== selectedCustomer?.id)
      );

      toast.success('Cliente excluído com sucesso!');
      setIsDeleteModalOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      toast.error('Erro ao excluir cliente');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>
        <button
          onClick={() => {
            setSelectedCustomer(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
        >
          Novo Cliente
        </button>
      </div>

      <DataTableContainer
        data={customers}
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
                {selectedCustomer ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedCustomer(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <PersonForm
              type="customer"
              initialData={selectedCustomer || undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={`o cliente ${selectedCustomer?.name}`}
      />
    </div>
  );
};