import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '../types';
import { db } from '../db';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const products = await db.prepare(`
        SELECT p.*, 
               pg.name as productGroupName,
               w.name as warehouseName,
               pt.name as priceTableName
        FROM products p
        LEFT JOIN product_groups pg ON p.product_group_id = pg.id
        LEFT JOIN warehouses w ON p.warehouse_id = w.id
        LEFT JOIN price_tables pt ON p.default_price_table_id = pt.id
      `).all();
      return products as Product[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      const result = await db.prepare(`
        INSERT INTO products (
          code, name, description, product_group_id, min_stock, 
          current_stock, warehouse_id, default_price_table_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        product.code,
        product.name,
        product.description,
        product.productGroupId,
        product.minStock,
        product.currentStock,
        product.warehouseId,
        product.defaultPriceTableId
      );
      return { ...product, id: result.lastInsertRowid as number };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto cadastrado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao cadastrar produto');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (product: Product) => {
      await db.prepare(`
        UPDATE products SET
          code = ?, name = ?, description = ?, product_group_id = ?,
          min_stock = ?, current_stock = ?, warehouse_id = ?,
          default_price_table_id = ?
        WHERE id = ?
      `).run(
        product.code,
        product.name,
        product.description,
        product.productGroupId,
        product.minStock,
        product.currentStock,
        product.warehouseId,
        product.defaultPriceTableId,
        product.id
      );
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar produto');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await db.prepare('DELETE FROM products WHERE id = ?').run(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir produto');
    },
  });

  return {
    ...query,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
  };
};