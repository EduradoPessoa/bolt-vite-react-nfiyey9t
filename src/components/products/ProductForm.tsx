import { Product } from '../../types';
import { useProductForm } from '../../hooks/useProductForm';
import { ProductFormFields } from './ProductFormFields';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  disabled?: boolean;
}

export const ProductForm = ({ initialData, onSubmit, disabled }: ProductFormProps) => {
  const { formData, handleChange, resetForm } = useProductForm(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Product);
    if (!initialData) {
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProductFormFields
        formData={formData}
        onChange={handleChange}
        disabled={disabled}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={disabled}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
        >
          {initialData ? 'Atualizar' : 'Cadastrar'} Produto
        </button>
      </div>
    </form>
  );
};