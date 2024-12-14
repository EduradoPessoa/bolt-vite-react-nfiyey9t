import { Edit2, Trash2 } from 'lucide-react';

interface ItemCardProps<T> {
  item: T;
  fields: {
    label: string;
    value: (item: T) => React.ReactNode;
  }[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function ItemCard<T>({ item, fields, onEdit, onDelete }: ItemCardProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={index}>
            <dt className="text-sm font-medium text-gray-500">{field.label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{field.value(item)}</dd>
          </div>
        ))}
      </div>
      
      {(onEdit || onDelete) && (
        <div className="mt-4 pt-4 border-t flex justify-end gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              className="p-2 text-amber-600 hover:text-amber-900 rounded-md hover:bg-amber-50"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(item)}
              className="p-2 text-red-600 hover:text-red-900 rounded-md hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}