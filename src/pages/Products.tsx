import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductForm } from '../components/forms/ProductForm';
import { DataTableContainer } from '../components/tables/DataTableContainer';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { Product } from '../types';
import toast from 'react-hot-toast';

export const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        {
          id: 1,
          code: 'PROD001',
          name: 'Produto A',
          description: 'Descrição do Produto A',
          productGroup: 'Eletrônicos',
          purchaseDate: '2024-03-15',
          lastPurchasePrice: 100.00,
          currentPrice: 150.00,
          minStock: 10,
          currentStock: 25,
          defaultWarehouse: 'Depósito Principal',
          supplierId: 1,
        },
        // Add more mock data as needed
      ];
    },
  });

  const columns = [
    { header: 'Código', accessor: 'code' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Grupo', accessor: 'productGroup' },
    { header: 'Preço Atual', accessor: (product: Product) => 
      `R$ ${product.currentPrice.toFixed(2)}` 
    },
    { header: 'Estoque', accessor: 'currentStock' },
    { header: 'Estoque Mín.', accessor: 'minStock' },
    { header: 'Almoxarifado', accessor: 'defaultWarehouse' },
  ];

  const filters = [
    { id: 'code', label: 'Código', type: 'text' as const },
    { id: 'name', label: 'Nome', type: 'text' as const },
    { 
      id: 'productGroup', 
      label: 'Grupo', 
      type: 'select' as const,
      options: [
        { value: 'Eletrônicos', label: 'Eletrônicos' },
        { value: 'Móveis', label: 'Móveis' },
        { value: 'Vestuário', label: 'Vestuário' },
      ],
    },
    {
      id: 'defaultWarehouse',
      label: 'Almoxarifado',
      type: 'select' as const,
      options: [
        { value: 'Depósito Principal', label: 'Depósito Principal' },
        { value: 'Depósito Secundário', label: 'Depósito Secundário' },
      ],
    },
  ];

  const cardFields = [
    { label: 'Código', value: (product: Product) => product.code },
    { label: 'Nome', value: (product: Product) => product.name },
    { label: 'Descrição', value: (product: Product) => product.description },
    { label: 'Estoque', value: (product: Product) => product.currentStock },
  ];

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (data: Product) => {
    try {
      // In a real app, this would be an API call
      // Simulate optimistic update
      if (selectedProduct) {
        queryClient.setQueryData(['products'], (old: Product[] = []) =>
          old.map(p => p.id === selectedProduct.id ? { ...data, id: p.id } : p)
        );
      } else {
        queryClient.setQueryData(['products'], (old: Product[] = []) => [
          ...old,
          { ...data, id: Math.max(0, ...old.map(p => p.id ?? 0)) + 1 }
        ]);
      }

      toast.success(
        selectedProduct 
          ? 'Produto atualizado com sucesso!' 
          : 'Produto cadastrado com sucesso!'
      );
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast.error(
        selectedProduct 
          ? 'Erro ao atualizar produto' 
          : 'Erro ao cadastrar produto'
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      // In a real app, this would be an API call
      // Simulate optimistic delete
      queryClient.setQueryData(['products'], (old: Product[] = []) =>
        old.filter(p => p.id !== selectedProduct?.id)
      );

      toast.success('Produto excluído com sucesso!');
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast.error('Erro ao excluir produto');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Produtos</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
        >
          Novo Produto
        </button>
      </div>

      <DataTableContainer
        data={products}
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
                {selectedProduct ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <ProductForm
              initialData={selectedProduct || undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={`o produto ${selectedProduct?.name}`}
      />
    </div>
  );
};