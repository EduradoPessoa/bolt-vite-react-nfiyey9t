import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './hooks/useAuth';
import { useDatabase } from './hooks/useDatabase';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Customers } from './pages/Customers';
import { Suppliers } from './pages/Suppliers';
import { Products } from './pages/Products';
import { ProductTypes } from './pages/ProductTypes';
import { ProductGroups } from './pages/ProductGroups';
import { Warehouses } from './pages/Warehouses';
import { PriceTables } from './pages/PriceTables';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const { isReady, error } = useDatabase();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Erro ao inicializar o banco de dados</h1>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Inicializando...</h1>
          <p className="text-gray-600">Aguarde enquanto o sistema é carregado</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="products" element={<Products />} />
            <Route path="product-types" element={<ProductTypes />} />
            <Route path="product-groups" element={<ProductGroups />} />
            <Route path="warehouses" element={<Warehouses />} />
            <Route path="price-tables" element={<PriceTables />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;