import { usersTable } from './users';
import { productTypesTable } from './product_types';
import { productGroupsTable } from './product_groups';
import { warehousesTable } from './warehouses';
import { priceTablesTable } from './price_tables';
import { productsTable } from './products';
import { customersTable } from './customers';
import { suppliersTable } from './suppliers';

export const tables = [
  usersTable,
  productTypesTable,
  productGroupsTable,
  warehousesTable,
  priceTablesTable,
  productsTable,
  customersTable,
  suppliersTable,
].join('\n\n');