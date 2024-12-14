import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductType } from '../types';
import { db } from '../db';
import toast from 'react-hot-toast';

export const useProductTypes = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product-types'],
    queryFn: async () => {
      const types = await db.prepare('SELECT * FROM product_types ORDER BY code').all();
      return types as ProductType[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (type: Omit<ProductType, 'id'>) => {
      const result = await db.prepare(
        'INSERT INTO product_types (code, description) VALUES (?, ?)'
      ).run(type.code, type.description);
      return { ...type, id: result.lastInsertRowid as number };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-types'] });
      toast.success('Tipo de produto cadastrado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao cadastrar tipo de produto');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (type: ProductType) => {
      await db.prepare(
        'UPDATE product_types SET code = ?, description = ? WHERE id = ?'
      ).run(type.code, type.description, type.id);
      return type;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-types'] });
      toast.success('Tipo de produto atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar tipo de produto');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await db.prepare('DELETE FROM product_types WHERE id = ?').run(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-types'] });
      toast.success('Tipo de produto excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir tipo de produto');
    },
  });

  return {
    ...query,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
  };
};