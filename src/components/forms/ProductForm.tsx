import { useState } from 'react';
import { Product } from '../../types';
import { useProductGroups } from '../../hooks/useProductGroups';
import { useWarehouses } from '../../hooks/useWarehouses';
import { usePriceTables } from '../../hooks/usePriceTables';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
}

export const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>(initialData || {
    code: '',
    name: '',
    description: '',
    productGroupId: 0,
    minStock: 0,
    currentStock: 0,
    warehouseId: 0,
    defaultPriceTableId: undefined,
  });

  const { data: productGroups = [] } = useProductGroups();
  const { data: warehouses = [] } = useWarehouses();
  const { data: priceTables = [] } = usePriceTables();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Código</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Grupo do Produto</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.productGroupId || ''}
            onChange={(e) => setFormData({ ...formData, productGroupId: Number(e.target.value) })}
          >
            <option value="">Selecione um grupo</option>
            {productGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Almoxarifado Padrão</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.warehouseId || ''}
            onChange={(e) => setFormData({ ...formData, warehouseId: Number(e.target.value) })}
          >
            <option value="">Selecione um almoxarifado</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tabela de Preços Padrão</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.defaultPriceTableId || ''}
            onChange={(e) => setFormData({ ...formData, defaultPriceTableId: Number(e.target.value) || undefined })}
          >
            <option value="">Selecione uma tabela</option>
            {priceTables.filter(table => table.active).map((table) => (
              <option key={table.id} value={table.id}>
                {table.name}
              </option>
            ))}
          </select>
        </div>

        {formData.lastPurchaseDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Data da Última Compra</label>
            <input
              type="date"
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
              value={formData.lastPurchaseDate}
            />
          </div>
        )}

        {formData.lastPurchasePrice !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço da Última Compra</label>
            <input
              type="number"
              step="0.01"
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
              value={formData.lastPurchasePrice}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Estoque Mínimo</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.minStock}
            onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estoque Atual</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.currentStock}
            onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          {initialData ? 'Atualizar' : 'Cadastrar'} Produto
        </button>
      </div>
    </form>
  );
};