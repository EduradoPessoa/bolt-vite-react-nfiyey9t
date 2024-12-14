import { Product } from '../../types';
import { useProductGroups } from '../../hooks/useProductGroups';
import { useWarehouses } from '../../hooks/useWarehouses';
import { usePriceTables } from '../../hooks/usePriceTables';

interface ProductFormFieldsProps {
  formData: Partial<Product>;
  onChange: (field: keyof Product, value: any) => void;
  disabled?: boolean;
}

export const ProductFormFields = ({ formData, onChange, disabled }: ProductFormFieldsProps) => {
  const { data: productGroups = [] } = useProductGroups();
  const { data: warehouses = [] } = useWarehouses();
  const { data: priceTables = [] } = usePriceTables();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Código</label>
        <input
          type="text"
          required
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100"
          value={formData.code}
          onChange={(e) => onChange('code', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
        <input
          type="text"
          required
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Grupo do Produto</label>
        <select
          required
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100"
          value={formData.productGroupId || ''}
          onChange={(e) => onChange('productGroupId', Number(e.target.value))}
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
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100"
          value={formData.warehouseId || ''}
          onChange={(e) => onChange('warehouseId', Number(e.target.value))}
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
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100"
          value={formData.defaultPriceTableId || ''}
          onChange={(e) => onChange('defaultPriceTableId', Number(e.target.value) || undefined)}
        >
          <option value="">Selecione uma tabela</option>
          {priceTables.filter(table => table.active).map((table) => (
            <option key={table.id} value={table.id}>
              {table.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estoque Mínimo</label>
        <input
          type="number"
          required
          min="0"
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100"
          value={formData.minStock}
          onChange={(e) => onChange('minStock', parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estoque Atual</label>
        <input
          type="number"
          required
          min="0"
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100"
          value={formData.currentStock}
          onChange={(e) => onChange('currentStock', parseInt(e.target.value))}
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 disabled:bg-gray-100"
          rows={3}
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>

      {formData.lastPurchaseDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Data da Última Compra</label>
          <input
            type="date"
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
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
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
            value={formData.lastPurchasePrice}
          />
        </div>
      )}
    </div>
  );
};