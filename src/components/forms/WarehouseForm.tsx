import { useState } from 'react';
import { Warehouse } from '../../types';

interface WarehouseFormProps {
  initialData?: Warehouse;
  onSubmit: (data: Warehouse) => void;
}

export const WarehouseForm = ({ initialData, onSubmit }: WarehouseFormProps) => {
  const [formData, setFormData] = useState<Warehouse>(initialData || {
    code: '',
    name: '',
    description: '',
    allowOutput: true,
  });

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
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-amber-600 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              checked={formData.allowOutput}
              onChange={(e) => setFormData({ ...formData, allowOutput: e.target.checked })}
            />
            <span className="text-sm font-medium text-gray-700">Permite Saída</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          {initialData ? 'Atualizar' : 'Cadastrar'} Almoxarifado
        </button>
      </div>
    </form>
  );
};