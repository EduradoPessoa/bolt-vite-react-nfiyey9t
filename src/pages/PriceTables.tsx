import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTableContainer } from '../components/tables/DataTableContainer';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { PriceTableForm } from '../components/forms/PriceTableForm';
import { PriceTable } from '../types';
import toast from 'react-hot-toast';

export const PriceTables = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPriceTable, setSelectedPriceTable] = useState<PriceTable | null>(null);
  const queryClient = useQueryClient();

  const { data: priceTables = [] } = useQuery({
    queryKey: ['price-tables'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        {
          id: 1,
          code: 'TAB001',
          name: 'Tabela Padrão',
          description: 'Tabela de preços padrão',
          startDate: '2024-03-01',
          endDate: '2024-12-31',
          active: true,
        },
      ];
    },
  });

  const columns = [
    { header: 'Código', accessor: 'code' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Início', accessor: (table: PriceTable) => 
      new Date(table.startDate).toLocaleDateString('pt-BR')
    },
    { header: 'Término', accessor: (table: PriceTable) => 
      table.endDate ? new Date(table.endDate).toLocaleDateString('pt-BR') : '-'
    },
    { header: 'Status', accessor: (table: PriceTable) => 
      table.active ? 'Ativa' : 'Inativa'
    },
  ];

  const filters = [
    { id: 'code', label: 'Código', type: 'text' as const },
    { id: 'name', label: 'Nome', type: 'text' as const },
    { 
      id: 'active', 
      label: 'Status', 
      type: 'select' as const,
      options: [
        { value: 'true', label: 'Ativa' },
        { value: 'false', label: 'Inativa' },
      ],
    },
  ];

  const cardFields = [
    { label: 'Código', value: (table: PriceTable) => table.code },
    { label: 'Nome', value: (table: PriceTable) => table.name },
    { label: 'Início', value: (table: PriceTable) => 
      new Date(table.startDate).toLocaleDateString('pt-BR')
    },
    { label: 'Status', value: (table: PriceTable) => 
      table.active ? 'Ativa' : 'Inativa'
    },
  ];

  const handleEdit = (table: PriceTable) => {
    setSelectedPriceTable(table);
    setIsModalOpen(true);
  };

  const handleDelete = (table: PriceTable) => {
    setSelectedPriceTable(table);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (data: PriceTable) => {
    try {
      if (selectedPriceTable) {
        queryClient.setQueryData(['price-tables'], (old: PriceTable[] = []) =>
          old.map(t => t.id === selectedPriceTable.id ? { ...data, id: t.id } : t)
        );
      } else {
        queryClient.setQueryData(['price-tables'], (old: PriceTable[] = []) => [
          ...old,
          { ...data, id: Math.max(0, ...old.map(t => t.id ?? 0)) + 1 }
        ]);
      }

      toast.success(
        selectedPriceTable 
          ? 'Tabela de preços atualizada com sucesso!' 
          : 'Tabela de preços cadastrada com sucesso!'
      );
      setIsModalOpen(false);
      setSelectedPriceTable(null);
    } catch (error) {
      toast.error(
        selectedPriceTable 
          ? 'Erro ao atualizar tabela de preços' 
          : 'Erro ao cadastrar tabela de preços'
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      queryClient.setQueryData(['price-tables'], (old: PriceTable[] = []) =>
        old.filter(t => t.id !== selectedPriceTable?.id)
      );

      toast.success('Tabela de preços excluída com sucesso!');
      setIsDeleteModalOpen(false);
      setSelectedPriceTable(null);
    } catch (error) {
      toast.error('Erro ao excluir tabela de preços');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tabelas de Preços</h1>
        <button
          onClick={() => {
            setSelectedPriceTable(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
        >
          Nova Tabela
        </button>
      </div>

      <DataTableContainer
        data={priceTables}
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
                {selectedPriceTable ? 'Editar Tabela' : 'Nova Tabela'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedPriceTable(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <PriceTableForm
              initialData={selectedPriceTable || undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPriceTable(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={`a tabela ${selectedPriceTable?.name}`}
      />
    </div>
  );
};